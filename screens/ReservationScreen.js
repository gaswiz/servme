// ReservationScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const BASE_URL = 'https://5a8b-94-66-154-234.ngrok-free.app';

export default function ReservationScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { name: restaurantName, image } = route.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [people, setPeople] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        navigation.navigate('Login');
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setName(data.name);
          setEmail(data.email);
          setPhone(data.phone);
        }
      } catch (err) {
        console.error('User fetch error:', err);
      }
    };

    const checkAvailability = async () => {
      try {
        const cleanedRestaurant = restaurantName.trim();
        const res = await fetch(`${BASE_URL}/api/reservations/availability/${encodeURIComponent(restaurantName)}`);
        const data = await res.json();
        if (res.ok) {
          setIsAvailable(data.available);
        } else {
          Alert.alert('Error', 'Could not check availability');
          setIsAvailable(null);
        }
      } catch (error) {
        console.error('Availability error:', error);
        setIsAvailable(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    checkAvailability();
  }, []);

  const handleSubmit = async () => {
    if (!people) return Alert.alert('Missing Field', 'Please enter number of people.');

    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const time = `${today.getHours()}:${today.getMinutes()}`;

    try {
      const res = await fetch(`${BASE_URL}/api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, time, people, restaurant: restaurantName.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert('Success', 'Reservation confirmed!');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Reservation failed');
      }
    } catch (error) {
      console.error('Submit error:', error);
      Alert.alert('Error', 'Failed to submit reservation');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={image} style={styles.image} />

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color="#264098" />
          <Text style={styles.backText}>Back to Restaurants</Text>
        </TouchableOpacity>

        <View style={styles.inner}>
          <Text style={styles.heading}>Reserve at {restaurantName.trim()}</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#264098" />
          ) : isAvailable === false ? (
            <Text style={styles.unavailable}>No availability left.</Text>
          ) : (
            <>
              <Text style={styles.label}>Name</Text>
              <View style={styles.lockedInputContainer}>
                <TextInput value={name} editable={false} style={styles.inputDisabled} />
                <Ionicons name="lock-closed-outline" size={18} color="#888" />
              </View>

              <Text style={styles.label}>Email</Text>
              <View style={styles.lockedInputContainer}>
                <TextInput value={email} editable={false} style={styles.inputDisabled} />
                <Ionicons name="lock-closed-outline" size={18} color="#888" />
              </View>

              <Text style={styles.label}>Phone</Text>
              <View style={styles.lockedInputContainer}>
                <TextInput value={phone} editable={false} style={styles.inputDisabled} />
                <Ionicons name="lock-closed-outline" size={18} color="#888" />
              </View>

              <Text style={styles.label}>Number of People</Text>
              <TextInput
                placeholder="e.g. 2"
                value={people}
                onChangeText={setPeople}
                style={styles.input}
                keyboardType="numeric"
              />

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Confirm Reservation</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  image: { width: '100%', height: 160 },
  inner: { padding: 20 },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#264098',
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#444',
    marginBottom: 4,
    marginTop: 10,
  },
  lockedInputContainer: {
    backgroundColor: '#EEE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  inputDisabled: {
    color: '#444',
    fontSize: 16,
    flex: 1,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#264098',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  backBtn: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backText: {
    color: '#264098',
    fontWeight: '600',
    marginLeft: 6,
  },
  unavailable: {
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 20,
  },
});

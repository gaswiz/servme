import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');

        if (!token || !userId) {
          navigation.navigate('Login');
          return;
        }

        const res = await fetch(`http://localhost:3001/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (res.ok) {
            setUser(data);
          } else {
            console.error('Fetch failed:', data);
            Alert.alert('Error', data.message || 'Failed to fetch user data');
          }
        } catch (err) {
          console.error('Invalid response from server:', text);
          Alert.alert('Error', 'Invalid response from server');
        }
      } catch (error) {
        console.error('Account fetch error:', error);
        Alert.alert('Error', 'Something went wrong while fetching user info.');
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userRole');
    await AsyncStorage.removeItem('userId');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading user data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#264098" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80',
            }}
            style={styles.avatar}
          />
          <Text style={styles.welcomeText}>Welcome, {user.name}</Text>
        </View>

        {/* User Info */}
        <View style={styles.infoSection}>
          {[
            { label: 'Name', value: user.name },
            { label: 'Surname', value: user.surname },
            { label: 'Email', value: user.email },
            { label: 'Phone', value: user.phone },
          ].map((item, index) => (
            <View key={index} style={styles.infoRow}>
              <View>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={20} color="#264098" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Reservation Placeholder */}
        <Text style={styles.sectionHeading}>Your Reservations</Text>
        <Text style={styles.cardText}>You have no reservations yet.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: '#999',
  },
  topBar: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: '#264098',
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  logoutText: {
    color: '#264098',
    fontWeight: '600',
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#264098',
  },
  infoSection: {
    marginTop: 30,
    marginHorizontal: 30,
    gap: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#264098',
    marginTop: 40,
    marginLeft: 30,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 30,
  },
});
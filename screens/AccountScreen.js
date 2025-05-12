// File: screens/AccountScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';

export default function AccountScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        navigation.replace('Login');
        return;
      }

      try {
        const userRes = await axios.get(`${BASE_URL}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        const reservationsRes = await axios.get(`${BASE_URL}/api/reservations`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userReservations = reservationsRes.data.filter(
          (resv) => String(resv.userId) === userId
        );

        setReservations(userReservations);
      } catch (error) {
        console.error('[AccountScreen] Error:', error);
        navigation.replace('Login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    Alert.alert('Logged out', 'You have been logged out.');
    navigation.replace('Login');
  };

  const handleCancel = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`${BASE_URL}/api/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations((prev) => prev.filter((r) => r.id !== id));
      Alert.alert('Canceled', 'Reservation deleted.');
    } catch (err) {
      console.error('[AccountScreen] Error canceling reservation:', err);
      Alert.alert('Error', 'Could not cancel reservation.');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#264098" />
      </View>
    );
  }

  if (!user) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={28} color="#264098" />
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
          style={styles.avatar}
        />
        <Text style={styles.welcome}>Welcome, {user.name}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{user.name} {user.surname}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>

        <Text style={styles.sectionTitle}>My Reservations</Text>
        {reservations.length === 0 ? (
          <Text style={styles.noReservations}>No reservations found.</Text>
        ) : (
          reservations.map((resv) => (
            <View key={resv.id} style={styles.reservationCard}>
              <Text style={styles.resvText}>Restaurant: {resv.restaurant}</Text>
              <Text style={styles.resvText}>Date: {resv.date}</Text>
              <Text style={styles.resvText}>Time: {resv.time}</Text>
              <Text style={styles.resvText}>People: {resv.people}</Text>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => handleCancel(resv.id)}
              >
                <Ionicons name="trash-outline" size={16} color="#fff" />
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },
  topBar: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  backBtn: {
    padding: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#264098',
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
    color: '#222',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: '#264098',
  },
  noReservations: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  reservationCard: {
    width: '100%',
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  resvText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9534f',
    padding: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  cancelText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#264098',
    padding: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

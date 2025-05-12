// ========================================================================================
// File: screens/AdminScreen.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Displays the Admin Panel interface where admin users can view a list of all
//    registered users and all current reservations. Data is fetched using the
//    authenticated token stored in AsyncStorage.
// ========================================================================================

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';

const AdminScreen = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    console.log('[AdminScreen] Fetching admin data');
    const fetchAdminData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          console.log('[AdminScreen] Token missing');
          Alert.alert('Error', 'User not authenticated');
          navigation.navigate('Login');
          return;
        }

        const usersRes = await fetch(`${BASE_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const usersJson = await usersRes.json();
        console.log('[AdminScreen] Users fetched:', usersJson.length);
        setUsers(usersJson);

        const reservationsRes = await fetch(`${BASE_URL}/api/reservations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const reservationsJson = await reservationsRes.json();
        console.log('[AdminScreen] Reservations fetched:', reservationsJson.length);
        setReservations(reservationsJson);
      } catch (error) {
        console.error('[AdminScreen] Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Admin Panel</Text>

      <Text style={styles.sectionTitle}>All Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>{item.name} {item.surname} - {item.email}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>All Reservations</Text>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>
              {item.restaurant} - {item.people} people - UserID: {item.userId}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backButton: { marginBottom: 10 },
  backText: { fontSize: 16, color: '#264098' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  itemBox: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  itemText: { fontSize: 16 },
});

export default AdminScreen;
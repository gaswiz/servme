// ========================================================================================
// File: screens/ReservationScreen.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Allows users to make a reservation by selecting date, time, and number of people.
//    Automatically fetches and locks user data fields, and submits the reservation
//    to the backend API. Includes calendar and time pickers.
// ========================================================================================

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BASE_URL } from '@env';

const ReservationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurantName } = route.params;

  const [userData, setUserData] = useState({ name: '', phone: '', email: '' });
  const [people, setPeople] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');

      if (userId && token) {
        try {
          const res = await axios.get(`${BASE_URL}/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { name, email, phone } = res.data;
          setUserData({ name, email, phone });
        } catch (error) {
          console.error('[ReservationScreen] Error fetching user:', error);
          Alert.alert('Error', 'Failed to load user data.');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleReservation = async () => {
    if (!people || !date || !time) {
      return Alert.alert('Missing Fields', 'Please complete all required fields.');
    }

    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');

    try {
      await axios.post(
        `${BASE_URL}/api/reservations`,
        {
          name: userData.name,
          phone: userData.phone,
          email: userData.email,
          people,
          date: date.toISOString().split('T')[0],
          time: time.toTimeString().slice(0, 5),
          restaurant: restaurantName,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Success', 'Reservation created!');
      navigation.goBack();
    } catch (err) {
      console.error('[ReservationScreen] Error submitting reservation:', err);
      Alert.alert('Error', 'Reservation failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={26} color="#264098" />
        </TouchableOpacity>

        <Text style={styles.title}>Reserve at {restaurantName}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Info</Text>
          {['name', 'phone', 'email'].map((field) => (
            <View style={styles.inputGroup} key={field}>
              <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
              <View style={styles.lockedInput}>
                <Text style={styles.lockedText}>{userData[field]}</Text>
                <Ionicons name="lock-closed-outline" size={16} color="#aaa" />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reservation Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of People</Text>
            <TextInput
              style={styles.input}
              value={people}
              onChangeText={setPeople}
              keyboardType="numeric"
              placeholder="e.g. 2"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              onPress={() => setDatePickerVisible(true)}
              style={styles.pickerButton}
            >
              <Ionicons name="calendar-outline" size={18} color="#264098" />
              <Text style={styles.pickerText}>{date.toISOString().split('T')[0]}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(selectedDate) => {
                setDatePickerVisible(false);
                if (selectedDate) setDate(selectedDate);
              }}
              onCancel={() => setDatePickerVisible(false)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity
              onPress={() => setTimePickerVisible(true)}
              style={styles.pickerButton}
            >
              <Ionicons name="time-outline" size={18} color="#264098" />
              <Text style={styles.pickerText}>{time.toTimeString().slice(0, 5)}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              is24Hour={true}
              onConfirm={(selectedTime) => {
                setTimePickerVisible(false);
                if (selectedTime) setTime(selectedTime);
              }}
              onCancel={() => setTimePickerVisible(false)}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleReservation}>
          <Text style={styles.buttonText}>Submit Reservation</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 50,
  },
  backBtn: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#264098',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#264098',
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: '#333',
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
  },
  lockedInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#f4f4f4',
  },
  lockedText: {
    fontSize: 16,
    color: '#666',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#264098',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ReservationScreen;
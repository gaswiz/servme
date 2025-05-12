// File: screens/HomeScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';

const imageMap = {
  Pizza: require('../assets/images/Pizza/pizza1.jpg'),
  Sushi: require('../assets/images/Sushi/sushi1.jpg'),
  'Fast Food': require('../assets/images/Fast/fast1.jpg'),
};

const HomeScreen = () => {
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token');

        if (!userId || !token) {
          setFullName('');
          return;
        }

        const url = `${BASE_URL}/api/users/${userId}`;
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, surname } = response.data;
        if (name && surname) {
          setFullName(`${name} ${surname}`);
        } else {
          setFullName('');
        }
      } catch (error) {
        setFullName('');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 7000);

    return () => clearTimeout(timeout);
  }, []);

  const categories = [
    { label: 'Pizza', screen: 'Pizza' },
    { label: 'Sushi', screen: 'Sushi' },
    { label: 'Fast Food', screen: 'FastFood' },
  ];

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#264098" />
        <Text style={{ marginTop: 10 }}>Loading user data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.welcome}>
            Welcome, {fullName ? fullName : 'Guest'}!
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Account')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="person-circle-outline" size={32} color="#264098" />
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Search restaurants..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          style={styles.searchBar}
        />

        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <View style={styles.grid}>
          {categories.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.card}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Image source={imageMap[item.label]} style={styles.image} />
              <Text style={styles.cardText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Account')}
          style={styles.reservationBtn}
        >
          <Text style={styles.reservationText}>View My Reservations</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B1F3B',
    flexShrink: 1,
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 12,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1B1F3B',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '32%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  reservationBtn: {
    flexDirection: 'row',
    backgroundColor: '#264098',
    padding: 14,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  reservationText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
});

export default HomeScreen;

// ========================================================================================
// File: screens/SushiScreen.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Displays a list of sushi restaurants with image previews and descriptions.
//    Each card links to the Reservation screen with the restaurant pre-selected.
// ========================================================================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const sushiRestaurants = [
  {
    id: 4,
    name: 'Sakura Zen',
    image: require('../assets/images/Sushi/sushi1.jpg'),
    description: 'Elegant sushi dining with premium ingredients.',
  },
  {
    id: 5,
    name: 'Tokyo Bites',
    image: require('../assets/images/Sushi/sushi2.jpg'),
    description: 'Authentic Japanese sushi experience.',
  },
  {
    id: 6,
    name: 'Wasabi Wave',
    image: require('../assets/images/Sushi/sushi3.jpg'),
    description: 'Fusion rolls and classic sushi dishes.',
  },
];

export default function SushiScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#264098" />
        </TouchableOpacity>

        <Text style={styles.header}>Sushi Restaurants</Text>

        {sushiRestaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate('Reservation', {
                restaurantId: restaurant.id,
                restaurantName: restaurant.name,
              })
            }
          >
            <Image source={restaurant.image} style={styles.image} />
            <Text style={styles.cardTitle}>{restaurant.name}</Text>
            <Text style={styles.cardDescription}>{restaurant.description}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.description}>
          Explore the finest sushi places with fresh ingredients and cozy vibes.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardTitle: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
});
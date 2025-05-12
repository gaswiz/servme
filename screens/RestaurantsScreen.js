// screens/RestaurantsScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '@env';

const localImages = {
  Pizza: require('../assets/images/Pizza/pizza2.jpg'),
  Burger: require('../assets/images/Fast/fast2.jpg'),
  Sushi: require('../assets/images/Sushi/sushi2.jpg'),
};


export default function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/restaurants`);
        setRestaurants(response.data);
      } catch (error) {
        console.error('[RestaurantsScreen] Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const CategoryCard = ({ label }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(label)}
    >
      <Image source={localImages[label]} style={styles.image} />
      <Text style={styles.cardTitle}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#264098" />
        </TouchableOpacity>

        <Text style={styles.header}>Explore Categories</Text>

        <View style={styles.row}>
          <CategoryCard label="Pizza" />
          <CategoryCard label="Burger" />
          <CategoryCard label="Sushi" />
        </View>

        <Text style={styles.description}>
          Choose your favorite cuisine and explore available restaurants for online reservations.
        </Text>

        <View style={styles.demoBox}>
          <Text style={styles.demoText}>
            This screen demonstrates the categories of restaurants users can explore and reserve from.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '30%',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 90,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardTitle: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  demoBox: {
    backgroundColor: '#FFF4CC',
    padding: 16,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  demoText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

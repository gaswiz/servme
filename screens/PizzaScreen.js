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

const pizzaRestaurants = [
  {
    id: 1,
    name: 'Napoli Express',
    image: require('../assets/images/Pizza/pizza1.jpg'),
    description: 'Classic Neapolitan pizza with fresh ingredients.',
  },
  {
    id: 2,
    name: 'PizzArte',
    image: require('../assets/images/Pizza/pizza2.jpg'),
    description: 'Artisan wood-fired pizza with rich flavor.',
  },
  {
    id: 3,
    name: 'Mamma Mia Pizzeria',
    image: require('../assets/images/Pizza/pizza3.jpg'),
    description: 'Traditional Italian pizza with a crispy crust.',
  },
];


export default function PizzaScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#264098" />
        </TouchableOpacity>

        <Text style={styles.header}>Pizza Restaurants</Text>

        {pizzaRestaurants.map((restaurant) => (
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
          These are popular pizza spots you can explore and make reservations at.
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

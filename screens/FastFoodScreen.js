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

const fastFoodRestaurants = [
  {
    id: 7,
    name: 'Burger Blast',
    image: require('../assets/images/Fast/fast1.jpg'),
    description: 'Juicy burgers and crispy fries.',
  },
  {
    id: 8,
    name: 'FryKing',
    image: require('../assets/images/Fast/fast2.jpg'),
    description: 'Fast service, loaded combos.',
  },
  {
    id: 9,
    name: 'Grill n’ Go',
    image: require('../assets/images/Fast/fast3.jpg'),
    description: 'Hot off the grill, ready to go.',
  },
];

export default function FastFoodScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#264098" />
        </TouchableOpacity>

        <Text style={styles.header}>Fast Food Restaurants</Text>

        {fastFoodRestaurants.map((restaurant) => (
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
          Explore the top fast food spots and grab a quick bite anytime!
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

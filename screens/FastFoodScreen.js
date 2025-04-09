import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const fastImages = [
  require('../assets/images/Fast/fast1.jpg'),
  require('../assets/images/Fast/fast2.jpg'),
  require('../assets/images/Fast/fast3.jpg'),
  require('../assets/images/Fast/fast4.jpg'),
  require('../assets/images/Fast/fast5.jpg'),
];

const fastRestaurants = [
  { name: 'Speedy Bites', description: 'Fast food with a gourmet twist.' },
  { name: 'Grill Master', description: 'Grilled to perfection in no time.' },
  { name: 'Express Diner', description: 'Classic American fast food vibes.' },
  { name: 'Chick’n’Rush', description: 'Crispy chicken served lightning fast.' },
  { name: 'WrapGo', description: 'Delicious wraps on the go.' },
];

export default function FastFoodScreen() {
  const navigation = useNavigation();

  const handleReserve = (restaurantName, image) => {
    navigation.navigate('Reservation', { name: restaurantName, image });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>🔥 Fast & Hot Restaurants</Text>

        {fastRestaurants.map((item, index) => (
          <View key={index} style={styles.cardWrapper}>
            <ImageBackground source={fastImages[index]} style={styles.card} imageStyle={styles.cardImage}>
              <View style={styles.overlay}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardText}>{item.description}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleReserve(item.name, fastImages[index])}
                >
                  <Text style={styles.buttonText}>Reserve</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#264098',
  },
  cardWrapper: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    height: 180,
    justifyContent: 'flex-end',
  },
  cardImage: {
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#264098',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
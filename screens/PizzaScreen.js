import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Local images
const pizzaImages = [
  require('../assets/images/Pizza/pizza1.jpg'),
  require('../assets/images/Pizza/pizza2.jpg'),
  require('../assets/images/Pizza/pizza3.jpg'),
  require('../assets/images/Pizza/pizza4.jpg'),
  require('../assets/images/Pizza/pizza5.jpg'),
];

const pizzaData = [
  {
    name: 'Pizza Palace',
    description: 'Wood-fired pizzas with fresh ingredients.',
    image: pizzaImages[0],
  },
  {
    name: 'Mamma Mia Pizzeria',
    description: 'Authentic Italian flavors in every slice.',
    image: pizzaImages[1],
  },
  {
    name: 'Cheesy Heaven',
    description: 'Extra cheese? Always. Always cheese.',
    image: pizzaImages[2],
  },
  {
    name: 'Napoli’s Finest',
    description: 'Old-school pies with Neapolitan soul.',
    image: pizzaImages[3],
  },
  {
    name: 'Crispy Crust Co.',
    description: 'Crispy, melty, unforgettable pizzas.',
    image: pizzaImages[4],
  },
];

export default function PizzaScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Pizza Specials</Text>

        {pizzaData.map((pizza, index) => (
          <View key={index} style={styles.card}>
            <Image source={pizza.image} style={styles.cardImage} />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{pizza.name}</Text>
              <Text style={styles.cardText}>{pizza.description}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('Reservation', {
                    name: pizza.name,
                    image: pizza.image,
                  })
                }
              >
                <Text style={styles.buttonText}>Reserve</Text>
              </TouchableOpacity>
            </View>
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
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#264098',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardTextContainer: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#264098',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

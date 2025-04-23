// PizzaScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const BASE_URL = 'https://5a8b-94-66-154-234.ngrok-free.app';

const pizzaImages = [
  require('../assets/images/Pizza/pizza1.jpg'),
  require('../assets/images/Pizza/pizza2.jpg'),
  require('../assets/images/Pizza/pizza3.jpg'),
  require('../assets/images/Pizza/pizza4.jpg'),
  require('../assets/images/Pizza/pizza5.jpg'),
];

const restaurantNames = [
  'Pizza Palace',
  'Mamma Mia Pizzeria',
  'Cheesy Heaven',
  'Napoli’s Finest',
  'Crispy Crust Co.',
];

export default function PizzaScreen() {
  const navigation = useNavigation();
  const [availabilityData, setAvailabilityData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const responses = await Promise.all(
          restaurantNames.map(name =>
            fetch(`${BASE_URL}/api/reservations/check?restaurant=${encodeURIComponent(name)}`)
          )
        );
        const results = await Promise.all(responses.map(res => res.json()));

        const availabilityMap = {};
        results.forEach((result, i) => {
          availabilityMap[restaurantNames[i]] = result.count;
        });

        setAvailabilityData(availabilityMap);
      } catch (error) {
        console.error('Availability fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#264098" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Pizza Specials</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#264098" />
        ) : (
          restaurantNames.map((name, index) => {
            const count = availabilityData[name] ?? 0;
            return (
              <View key={index} style={styles.card}>
                <Image source={pizzaImages[index]} style={styles.cardImage} />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{name}</Text>
                  <Text style={styles.cardText}>Wood-fired pizzas with fresh ingredients.</Text>
                  <Text style={styles.availability}>
                    {count < 10
                      ? `Available reservations: ${10 - count}`
                      : 'Fully booked'}
                  </Text>

                  <TouchableOpacity
                    style={[styles.button, count >= 10 && styles.disabledButton]}
                    onPress={() =>
                      count < 10 &&
                      navigation.navigate('Reservation', {
                        name,
                        image: pizzaImages[index],
                      })
                    }
                    disabled={count >= 10}
                  >
                    <Text style={styles.buttonText}>
                      {count >= 10 ? 'Unavailable' : 'Reserve'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  topBar: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 6,
  },
  availability: {
    fontSize: 14,
    color: '#264098',
    fontWeight: '500',
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
  disabledButton: {
    backgroundColor: '#999',
  },
});

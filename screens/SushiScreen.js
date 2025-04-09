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
const sushiImages = [
  require('../assets/images/Sushi/sushi1.jpg'),
  require('../assets/images/Sushi/sushi2.jpg'),
  require('../assets/images/Sushi/sushi3.jpg'),
  require('../assets/images/Sushi/sushi4.jpg'),
  require('../assets/images/Sushi/sushi5.jpg'),
];

const sushiRestaurants = [
  {
    name: 'Tokyo Drift Sushi',
    description: 'Elegant bites of the freshest seafood.',
    image: sushiImages[0],
  },
  {
    name: 'Sakura Delight',
    description: 'Traditional sushi with a modern twist.',
    image: sushiImages[1],
  },
  {
    name: 'Wasabi Zen',
    description: 'Hot wasabi meets chilled perfection.',
    image: sushiImages[2],
  },
  {
    name: 'Nori Dreams',
    description: 'Wrap yourself in the seaweed of dreams.',
    image: sushiImages[3],
  },
  {
    name: 'Sushi Go!',
    description: 'Grab it fast, taste it forever.',
    image: sushiImages[4],
  },
];

export default function SushiScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Sushi Spots</Text>

        {sushiRestaurants.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity
              style={styles.reserveButton}
              onPress={() =>
                navigation.navigate('Reservation', {
                  name: item.name,
                  image: item.image,
                })
              }
            >
              <Text style={styles.reserveText}>Reserve</Text>
            </TouchableOpacity>
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
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#264098',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  reserveButton: {
    backgroundColor: '#264098',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  reserveText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

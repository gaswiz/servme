import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Local images
const restaurantImages = [
  require('../assets/images/Restaurants/restaurant1.jpg'),
  require('../assets/images/Restaurants/restaurant2.jpg'),
  require('../assets/images/Restaurants/restaurant3.jpg'),
  require('../assets/images/Restaurants/restaurant4.jpg'),
  require('../assets/images/Restaurants/restaurant5.jpg'),
];

const categories = ['Pizza', 'Sushi', 'Fast Food'];

const restaurants = {
  Pizza: [
    { name: 'Pizza Palace', description: 'Wood-fired pizzas with fresh ingredients.', image: restaurantImages[0] },
    { name: 'Mamma Mia', description: 'Authentic Napoli-style pizzas.', image: restaurantImages[1] },
    { name: 'Slice It', description: 'Fast, hot, and cheesy slices.', image: restaurantImages[2] },
  ],
  Sushi: [
    { name: 'Sakura Sushi', description: 'Fresh sushi crafted to perfection.', image: restaurantImages[3] },
    { name: 'Tokyo Rolls', description: 'Classic Japanese sushi rolls.', image: restaurantImages[4] },
    { name: 'Nori House', description: 'Tasty bites wrapped in nori.', image: restaurantImages[0] },
  ],
  'Fast Food': [
    { name: 'Burger Bomb', description: 'Explosive flavors in every burger.', image: restaurantImages[1] },
    { name: 'Fries Hub', description: 'Where fries meet gourmet.', image: restaurantImages[2] },
    { name: 'Snack Rush', description: 'Speedy and satisfying snacks.', image: restaurantImages[3] },
  ],
};

export default function RestaurantsScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Pizza');
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef();

  useEffect(() => {
    let offset = 0;
    const interval = setInterval(() => {
      offset = (offset + 250) % (restaurantImages.length * 250);
      scrollRef.current?.scrollTo({ x: offset, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Recommended for You</Text>

        {/* Animated Carousel */}
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {restaurantImages.map((img, idx) => (
            <Image key={idx} source={img} style={styles.heroImage} />
          ))}
        </ScrollView>

        {/* Categories */}
        <View style={styles.categories}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Restaurant Cards */}
        <View style={styles.restaurantList}>
          {restaurants[selectedCategory].map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>{item.description}</Text>
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
        </View>
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
  carousel: {
    marginBottom: 20,
  },
  heroImage: {
    width: 250,
    height: 150,
    borderRadius: 16,
    marginRight: 15,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  categoryButtonActive: {
    backgroundColor: '#264098',
  },
  categoryText: {
    color: '#444',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  restaurantList: {
    marginBottom: 20,
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
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardText: {
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

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const categories = ['Pizza', 'Sushi', 'Fast Food'];

const imageUrls = [
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
];

const restaurants = {
  Pizza: [
    { name: 'Pizza Palace', description: 'Wood-fired pizzas with fresh ingredients.' },
    { name: 'Mamma Mia Pizzeria', description: 'Authentic Italian flavors in every slice.' },
    { name: 'Cheesy Heaven', description: 'Extra cheese? Always. Always cheese.' },
  ],
  Sushi: [
    { name: 'Sushi Express', description: 'Quick, fresh, and delicious sushi rolls.' },
    { name: 'Tokyo Bites', description: 'Traditional Japanese dining experience.' },
    { name: 'Nori House', description: 'Seaweed dreams and soy sauce streams.' },
  ],
  'Fast Food': [
    { name: 'Burger Blast', description: 'Juicy burgers and crispy fries.' },
    { name: 'Snack Rush', description: 'Late-night cravings? We got you.' },
    { name: 'Fry Station', description: 'Fast, greasy, glorious goodness.' },
  ],
};

export default function RestaurantsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Pizza');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Recommended for You</Text>

        {/* Hero Carousel */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
          {imageUrls.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.heroImage} />
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
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>{item.description}</Text>
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
});

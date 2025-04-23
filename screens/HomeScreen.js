import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://5a8b-94-66-154-234.ngrok-free.app';

const featuredItems = [
  {
    title: 'Pizza Specials',
    description: "Check out this week's pizza deals.",
    keywords: ['pizza'],
    navigateTo: 'Pizza',
    category: 'Pizza',
  },
  {
    title: 'Sushi Spots',
    description: 'Explore top-rated sushi restaurants.',
    keywords: ['sushi'],
    navigateTo: 'Sushi',
    category: 'Sushi',
  },
  {
    title: 'Fast & Hot',
    description: 'Burgers delivered under 30 minutes.',
    keywords: ['fast', 'burger'],
    navigateTo: 'FastFood',
    category: 'Fast Food',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState(null);
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await AsyncStorage.getItem('userRole');
      setRole(userRole);
    };

    const fetchAvailability = async () => {
      try {
        const categories = featuredItems.map(item => item.category);
        const results = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(`${BASE_URL}/api/reservations/check/category?name=${encodeURIComponent(category)}`);
            const data = await res.json();
            return { category, available: data.available };
          })
        );

        const availabilityMap = {};
        results.forEach(result => {
          availabilityMap[result.category] = result.available;
        });

        setAvailability(availabilityMap);
      } catch (err) {
        console.error('Availability fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
    fetchAvailability();
  }, []);

  const filteredItems = featuredItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.keywords.some(kw => kw.includes(searchQuery.toLowerCase()))
  );

  const handleAccountPress = () => {
    if (role === 'admin') {
      navigation.navigate('Admin');
    } else {
      navigation.navigate('Account');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>ServMe</Text>
        <TouchableOpacity onPress={handleAccountPress}>
          <Ionicons name="person-circle-outline" size={32} color="#264098" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search for restaurants..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {filteredItems.map((item, index) => {
          const isAvailable = availability[item.category];
          const isDisabled = isAvailable === false;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.card, isDisabled && styles.cardDisabled]}
              onPress={() => !isDisabled && navigation.navigate(item.navigateTo)}
              disabled={isDisabled}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText}>{item.description}</Text>
              {loading ? (
                <ActivityIndicator size="small" color="#888" style={{ marginTop: 4 }} />
              ) : isDisabled ? (
                <Text style={styles.unavailable}>Fully booked</Text>
              ) : (
                <Text style={styles.available}>Reservations available</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { fontSize: 28, fontWeight: 'bold', color: '#264098' },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },
  content: { padding: 20 },
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
  cardDisabled: {
    backgroundColor: '#E0E0E0',
  },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  cardText: { fontSize: 14, color: '#666' },
  unavailable: {
    color: 'red',
    fontSize: 13,
    marginTop: 6,
  },
  available: {
    color: 'green',
    fontSize: 13,
    marginTop: 6,
  },
});

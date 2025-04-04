import React from 'react';
import { useNavigation } from '@react-navigation/native';


import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';



export default function HomeScreen() {
  const navigation = useNavigation();
  

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
       <View style={styles.header}>
      <Text style={styles.logo}>ServMe</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <Ionicons name="person-circle-outline" size={32} color="#264098" />
      </TouchableOpacity>
    </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput placeholder="Search for restaurants..." style={styles.searchInput} />
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🍕 Pizza Specials</Text>
          <Text style={styles.cardText}>Check out this week's pizza deals.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🍣 Sushi Spots</Text>
          <Text style={styles.cardText}>Explore top-rated sushi restaurants.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🍔 Fast & Hot</Text>
          <Text style={styles.cardText}>Burgers delivered under 30 minutes.</Text>
        </View>

        <TouchableOpacity
        style={{
        backgroundColor: '#264098',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 30,
        }}
        onPress={() => navigation.navigate('SignUp')} >

      <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Test Signup</Text>
      </TouchableOpacity>



      </ScrollView>

 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#264098',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  content: {
    padding: 20,
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
  } 

});

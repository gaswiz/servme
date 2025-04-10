import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AccountScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // Check if the user is logged in by verifying the presence of a token
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to Login screen if not logged in
      navigation.navigate('Login');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#264098" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80',
            }}
            style={styles.avatar}
          />
          <Text style={styles.welcomeText}>Welcome, user</Text>
        </View>

        {/* User Info */}
        <View style={styles.infoSection}>
          {[
            { label: 'Name', value: 'John' },
            { label: 'Surname', value: 'Doe' },
            { label: 'Email', value: 'john.doe@example.com' },
            { label: 'Phone', value: '+30 6912345678' },
          ].map((item, index) => (
            <View key={index} style={styles.infoRow}>
              <View>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={20} color="#264098" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Reservation History */}
        <Text style={styles.sectionHeading}>Your Reservations</Text>
        {[1, 2, 3].map((_, index) => (
          <View key={index} style={styles.reservationCard}>
            <Text style={styles.cardTitle}>Reservation #{index + 1}</Text>
            <Text style={styles.cardText}>Date: 2025-04-0{index + 1}</Text>
            <Text style={styles.cardText}>Time: 19:00</Text>
            <Text style={styles.cardText}>People: 2</Text>
            <Text style={styles.cardText}>Place: Pizza Palace</Text>
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
  topBar: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#264098',
  },
  infoSection: {
    marginTop: 30,
    marginHorizontal: 30,
    gap: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#264098',
    marginTop: 40,
    marginLeft: 30,
    marginBottom: 20,
  },
  reservationCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 30,
    marginBottom: 20,
    padding: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
});

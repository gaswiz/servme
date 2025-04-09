import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AdminScreen() {
  const navigation = useNavigation();
  const [showReservations, setShowReservations] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [searchText, setSearchText] = useState('');

  const users = [
    { name: 'John', surname: 'Doe', email: 'john.doe@example.com', phone: '+30 6912345678' },
    { name: 'Anna', surname: 'Smith', email: 'anna.smith@example.com', phone: '+30 6912341234' },
    { name: 'Bob', surname: 'Johnson', email: 'bob.j@example.com', phone: '+30 6912349999' },
  ];

  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.surname}`.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#264098" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80' }}
            style={styles.avatar}
          />
          <Text style={styles.welcomeText}>Welcome, admin</Text>
        </View>

        <View style={styles.sectionButtons}>
          <TouchableOpacity onPress={() => setShowReservations(!showReservations)}>
            <Text style={styles.toggleButton}>Reservations</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowUsers(!showUsers)}>
            <Text style={styles.toggleButton}>Users</Text>
          </TouchableOpacity>
        </View>

        {showReservations && (
          <View style={styles.sectionBlock}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.reservationCard}>
                <Text style={styles.cardTitle}>Reservation #{index + 1}</Text>
                <Text style={styles.cardText}>Date: 2025-04-0{index + 1}</Text>
                <Text style={styles.cardText}>Time: 19:00</Text>
                <Text style={styles.cardText}>People: 2</Text>
                <Text style={styles.cardText}>Place: Pizza Palace</Text>
                <MaterialIcons name="edit" size={20} color="#264098" style={styles.editIcon} />
              </View>
            ))}
          </View>
        )}

        {showUsers && (
          <View style={styles.sectionBlock}>
            <TextInput
              placeholder="Search users..."
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
            {filteredUsers.map((user, idx) => (
              <View key={idx} style={styles.userCard}>
                <Text style={styles.cardTitle}>{user.name} {user.surname}</Text>
                <Text style={styles.cardText}>Email: {user.email}</Text>
                <Text style={styles.cardText}>Phone: {user.phone}</Text>
                <MaterialIcons name="edit" size={20} color="#264098" style={styles.editIcon} />
              </View>
            ))}
          </View>
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
  sectionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  toggleButton: {
    fontSize: 16,
    color: '#264098',
    fontWeight: '600',
  },
  sectionBlock: {
    marginHorizontal: 30,
    gap: 20,
  },
  reservationCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    position: 'relative',
  },
  userCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    marginBottom: 10,
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
  editIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  searchInput: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

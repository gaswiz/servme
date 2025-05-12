// ========================================================================================
// File: screens/SupportScreen.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    Displays a basic support/FAQ interface with hardcoded questions.
//    Includes a dev-purpose support alert and back navigation.
// ========================================================================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SupportScreen() {
  const navigation = useNavigation();

  const handleSupport = () => {
    Alert.alert('Support', 'This is for development purposes xD');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#264098" />
        </TouchableOpacity>

        <Text style={styles.header}>Frequently Asked Questions</Text>

        <View style={styles.faqSection}>
          <Text style={styles.question}>How do I make a reservation?</Text>
          <Text style={styles.answer}>
            Go to the restaurant section, select a place, choose time and date, and confirm.
          </Text>

          <Text style={styles.question}>Can I cancel my reservation?</Text>
          <Text style={styles.answer}>
            Yes. Head to your profile, open your reservation, and hit cancel.
          </Text>

          <Text style={styles.question}>How can I contact the restaurant?</Text>
          <Text style={styles.answer}>
            Contact info is shown after making a reservation.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSupport}>
          <Text style={styles.buttonText}>Contact Support</Text>
        </TouchableOpacity>

        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            ℹ️ Η εφαρμογή ServMe δημιουργήθηκε ως μέρος πανεπιστημιακού έργου.
            Μέσα από την οθόνη υποστήριξης μπορείτε να βρείτε απαντήσεις σε βασικές ερωτήσεις
            και να επικοινωνήσετε για βοήθεια.
            Η ανάπτυξη πραγματοποιήθηκε από τον Κωνσταντίνο Παναγιωταρόπουλο.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#264098',
    marginBottom: 20,
  },
  faqSection: {
    marginBottom: 30,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  answer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#264098',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  noteBox: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  noteText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
  },
});
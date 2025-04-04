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

export default function SupportScreen() {
  const handleSupport = () => {
    Alert.alert('Support', 'This is for development purposes xD');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Frequently Asked Questions</Text>

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
    marginBottom: 20,
    color: '#264098',
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
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

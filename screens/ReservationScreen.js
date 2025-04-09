import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ReservationScreen() {
  const route = useRoute();
  const { name, image } = route.params;

  const [availability, setAvailability] = useState(8); // simulate availability < 10
  const [form, setForm] = useState({
    reservationName: '',
    phone: '',
    email: '',
    people: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (availability >= 10) {
      Alert.alert(`${name} is sold out`, 'Please try another time.', [{ text: 'OK' }]);
    } else {
      setAvailability((prev) => prev + 1);
      Alert.alert('Reservation Confirmed!', `Your table at ${name} is booked.`, [
        { text: 'OK' },
      ]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image} style={styles.heroImage} imageStyle={{ borderRadius: 0 }}>
        <View style={styles.overlay} />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.availability}>Availability: {10 - availability}/10</Text>
      </ImageBackground>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Reservation Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange('reservationName', text)}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          onChangeText={(text) => handleChange('phone', text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          onChangeText={(text) => handleChange('email', text)}
        />

        <Text style={styles.label}>Number of People</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(text) => handleChange('people', text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Reservation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
  },
  heroImage: {
    height: 250,
    justifyContent: 'flex-end',
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
  },
  availability: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 4,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    borderColor: '#DDD',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#264098',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

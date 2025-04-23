// SignUpScreen.js (with real-time validation and animated warnings)
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BASE_URL = 'https://5a8b-94-66-154-234.ngrok-free.app';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const allValid =
      !Object.values(errors).some(Boolean) &&
      Object.values(form).every(value => value.trim() !== '');

    Animated.timing(fadeAnim, {
      toValue: allValid ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [errors, form]);

  const validate = (field, value) => {
    let error = '';
    switch (field) {
      case 'name':
      case 'surname':
        if (!/^[A-Za-z]+$/.test(value)) error = 'Only letters allowed';
        break;
      case 'phone':
        if (!/^\d{10}$/.test(value)) error = 'Phone must be 10 digits';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email';
        break;
      case 'password':
        if (value.length < 1 || value.length > 10)
          error = 'Password must be 1-10 characters';
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const anyError = Object.values(errors).some(e => e);
    const anyEmpty = Object.values(form).some(v => v.trim() === '');
    if (anyError || anyEmpty) return;

    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Server error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>ServMe</Text>

        {['name', 'surname', 'phone', 'email', 'password'].map((field, index) => (
          <View key={index}>
            <TextInput
              placeholder={field[0].toUpperCase() + field.slice(1)}
              style={[styles.input, errors[field] && styles.errorInput]}
              onChangeText={value => validate(field, value)}
              value={form[field]}
              secureTextEntry={field === 'password'}
              keyboardType={field === 'phone' ? 'numeric' : 'default'}
              maxLength={field === 'phone' ? 10 : undefined}
            />
            {errors[field] && (
              <Animated.Text style={{ ...styles.errorText, opacity: fadeAnim }}>
                {errors[field]}
              </Animated.Text>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={[styles.button, Object.values(errors).some(Boolean) && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={Object.values(errors).some(Boolean)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Click here to login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { padding: 20, paddingTop: 60 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#264098',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    fontSize: 16,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#264098',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonDisabled: {
    backgroundColor: '#AAB3C2',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    textAlign: 'center',
    color: '#264098',
    fontSize: 14,
  },
});
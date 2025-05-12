// screens/SignUpScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '@env';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const empty = Object.values(form).some(v => v.trim() === '');
    if (empty) {
      Alert.alert('Missing Fields', 'Please complete all fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('userId', data.id.toString());
        await AsyncStorage.setItem('userRole', data.role);
        if (data.role === 'admin') {
          navigation.replace('Admin');
        } else {
          navigation.replace('MainTabs');
        }
      } else {
        Alert.alert('Signup Failed', data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('[SignUpScreen] Server error:', err.message);
      Alert.alert('Error', 'Server error during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#000"
              value={form.name}
              onChangeText={text => handleChange('name', text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Surname"
              placeholderTextColor="#000"
              value={form.surname}
              onChangeText={text => handleChange('surname', text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#000"
              value={form.phone}
              onChangeText={text => handleChange('phone', text)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={10}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#000"
              value={form.email}
              onChangeText={text => handleChange('email', text)}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              value={form.password}
              onChangeText={text => handleChange('password', text)}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  flex: {
    flex: 1,
  },
  container: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B1F3B',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#707070',
    textAlign: 'center',
    marginBottom: 28,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  button: {
    backgroundColor: '#264098',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 17,
  },
  linkText: {
    textAlign: 'center',
    color: '#264098',
    fontSize: 14,
  },
});

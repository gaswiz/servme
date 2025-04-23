import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://5a8b-94-66-154-234.ngrok-free.app';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
        return;
      }

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('userId', String(data.id));
      await AsyncStorage.setItem('userRole', data.role);

      navigation.navigate('Home');
    } catch (err) {
      console.error('Login error:', err);
      Alert.alert('Error', 'Server error. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>
          Don't have an account? Click here to sign up
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#264098',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#264098',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
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

// storage.js
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

let asyncStorage;

if (Platform.OS === 'web') {
  let inMemoryStore = {};
  asyncStorage = {
    getItem: async (key) => inMemoryStore[key] || null,
    setItem: async (key, value) => {
      inMemoryStore[key] = value;
    },
    removeItem: async (key) => {
      delete inMemoryStore[key];
    },
  };
} else {
  asyncStorage = {
    getItem: SecureStore.getItemAsync,
    setItem: SecureStore.setItemAsync,
    removeItem: SecureStore.deleteItemAsync,
  };
}

export default asyncStorage;

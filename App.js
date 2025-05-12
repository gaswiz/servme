// ========================================================================================
// File: App.js
// Project: ServMe - Full-Stack Restaurant Reservation App
// Author: Konstantinos Panagiotaropoulos
// Course Code: CN6035 - Mobile & Distributed Systems
// Description:
//    The main entry point for the React Native application.
//    This file sets up the main navigation structure, including both tab navigation (for main features)
//    and stack navigation (for screen transitions). It checks user authentication status and routes
//    to the appropriate screens based on the role (admin or user).
// ========================================================================================

import { registerRootComponent } from 'expo';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { StatusBar, ActivityIndicator, View, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen';
import RestaurantsScreen from './screens/RestaurantsScreen';
import SupportScreen from './screens/SupportScreen';
import AccountScreen from './screens/AccountScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import AdminScreen from './screens/AdminScreen';
import PizzaScreen from './screens/PizzaScreen';
import FastFoodScreen from './screens/FastFoodScreen';
import SushiScreen from './screens/SushiScreen';
import ReservationScreen from './screens/ReservationScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#264098',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="restaurant-menu" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="support" size={22} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      const token = await AsyncStorage.getItem('token');
      const role = await AsyncStorage.getItem('userRole');

      if (token && role === 'admin') {
        setInitialRoute('Admin');
      } else if (token && role === 'user') {
        setInitialRoute('MainTabs');
      } else {
        setInitialRoute('Login');
      }
    };

    initialize();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#264098" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen name="MainTabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Pizza" component={PizzaScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FastFood" component={FastFoodScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Sushi" component={SushiScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Burger" component={FastFoodScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Reservation" component={ReservationScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </NavigationContainer>
  );
}

export default registerRootComponent(App);

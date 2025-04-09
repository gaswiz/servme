import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'react-native';

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
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="restaurant-menu" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="support" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Pizza" component={PizzaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FastFood" component={FastFoodScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sushi" component={SushiScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Reservation" component={ReservationScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
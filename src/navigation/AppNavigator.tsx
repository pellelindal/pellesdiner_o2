import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import ContactScreen from '../screens/ContactScreen';
import { RootTabParamList } from './types';

enableScreens();

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      id="MainTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fbbf24',
        tabBarStyle: { backgroundColor: '#101010', borderTopColor: '#222' },
      }}
      initialRouteName="Hjem"
    >
      <Tab.Screen name="Hjem" component={HomeScreen} />
      <Tab.Screen name="Bestilling" component={BookingScreen} />
      <Tab.Screen name="Kontakt" component={ContactScreen} />
    </Tab.Navigator>
  );
}

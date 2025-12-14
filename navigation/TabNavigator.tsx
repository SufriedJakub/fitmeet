// navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MatchesScreen from '../screens/MatchesScreen';
import InvitesScreen from '../screens/InvitesScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Szukaj' }} />
      <Tab.Screen name="Matches" component={MatchesScreen} options={{ title: 'Pary' }} />
      <Tab.Screen name="Invites" component={InvitesScreen} options={{ title: 'Zaproszenia' }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

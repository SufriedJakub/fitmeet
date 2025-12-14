// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MatchScreen from '../screens/MatchScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen'; // <--- DODANO IMPORT
import TabNavigator from './TabNavigator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            {/* Ekrany dostępne dla zalogowanego */}
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} /> {/* <--- DODANO TO */}
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Match" component={MatchScreen} />
          </>
        ) : (
          <>
            {/* Ekrany dla niezalogowanego */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

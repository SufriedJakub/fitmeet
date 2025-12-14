import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // <--- Ważny import
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    // Styl flex: 1 jest konieczny
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}

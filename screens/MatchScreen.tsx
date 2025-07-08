
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MatchScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Mamy to!</Text>
      <Text style={styles.sub}>Ty i Twój gym buddy daliście się w prawo!</Text>

      <Button title="Zaproponuj termin treningu" onPress={() => navigation.navigate('Chat')} />
      <Button title="Wróć do swipe’ów" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, textAlign: 'center', marginBottom: 20 },
  sub: { fontSize: 18, textAlign: 'center', marginBottom: 40 },
});

export default MatchScreen;

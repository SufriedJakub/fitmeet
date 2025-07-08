// components/SwipeCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  name: string;
  gym: string;
  goal: string;
  city: string;
}

const SwipeCard = ({ name, gym, goal, city }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.info}>🏋️ Siłownia: {gym}</Text>
      <Text style={styles.info}>🎯 Cel: {goal}</Text>
      <Text style={styles.info}>📍 Miasto: {city}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    elevation: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default SwipeCard;

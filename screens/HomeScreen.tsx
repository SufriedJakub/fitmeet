
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitMeet</Text>
      <Text style={styles.sub}>Swipe gym bro/sis →</Text>

      {/* Tu będą karty z profilami do przesuwania */}

      <View style={styles.bottom}>
        <Button title="Czat" onPress={() => navigation.navigate('Chat')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 32, textAlign: 'center', marginBottom: 20 },
  sub: { fontSize: 18, textAlign: 'center', marginBottom: 60 },
  bottom: { marginTop: 60 },
});

export default HomeScreen;

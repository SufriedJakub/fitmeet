
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ChatScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Czat</Text>
      <Text style={styles.info}>Tutaj będą rozmowy z Twoimi gym bro i gym sis 💬</Text>

      {/* W przyszłości: lista rozmów, klik = wejście w konkretny czat */}

      <Button title="Wróć do swipe'ów" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  info: { fontSize: 16, textAlign: 'center', marginBottom: 40 },
});

export default ChatScreen;

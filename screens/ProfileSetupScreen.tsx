// screens/ProfileSetupScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, ScrollView } from 'react-native';

const ProfileSetupScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [city, setCity] = useState('');
  const [gym, setGym] = useState('');
  const [goal, setGoal] = useState('masa');

  const handleSave = () => {
    // tu będzie zapis profilu do Firestore
    console.log({ name, gender, city, gym, goal });
    navigation.navigate('Home'); // przejście do ekranu swipe'ów
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Uzupełnij profil</Text>

      <TextInput
        placeholder="Imię"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Płeć</Text>
      <Picker selectedValue={gender} onValueChange={setGender} style={styles.input}>
        <Picker.Item label="Mężczyzna" value="male" />
        <Picker.Item label="Kobieta" value="female" />
      </Picker>

      <TextInput
        placeholder="Miasto"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />

      <TextInput
        placeholder="Siłownia (np. Zdrofit Wola)"
        style={styles.input}
        value={gym}
        onChangeText={setGym}
      />

      <Text style={styles.label}>Cel treningowy</Text>
      <Picker selectedValue={goal} onValueChange={setGoal} style={styles.input}>
        <Picker.Item label="Masa" value="masa" />
        <Picker.Item label="Redukcja" value="redukcja" />
        <Picker.Item label="Utrzymanie" value="utrzymanie" />
        <Picker.Item label="Ogólna sprawność" value="ogolna" />
      </Picker>

      <Button title="Zapisz i przejdź" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 20, fontSize: 16 },
  label: { marginTop: 10, fontSize: 16, fontWeight: 'bold' },
});

export default ProfileSetupScreen;

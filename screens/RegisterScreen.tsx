// screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('ProfileSetup'); // po rejestracji → uzupełnianie profilu
    } catch (error: any) {
      Alert.alert('Błąd rejestracji', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Załóż konto</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Hasło"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Zarejestruj się" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Masz już konto? Zaloguj się
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, textAlign: 'center', marginBottom: 40 },
  input: { borderBottomWidth: 1, marginBottom: 20, fontSize: 16 },
  link: { marginTop: 20, color: 'blue', textAlign: 'center' },
});

export default RegisterScreen;

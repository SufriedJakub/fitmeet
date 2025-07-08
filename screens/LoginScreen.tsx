
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // tu dodamy firebase login
    console.log('Logging in with:', email, password);
    navigation.navigate('Home'); // tymczasowo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitMeet</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Hasło"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Zaloguj się" onPress={handleLogin} />
      <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
        Nie masz konta? Zarejestruj się
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, textAlign: 'center', marginBottom: 40 },
  input: { borderBottomWidth: 1, marginBottom: 20, fontSize: 16 },
  registerLink: { marginTop: 20, color: 'blue', textAlign: 'center' },
});

export default LoginScreen;

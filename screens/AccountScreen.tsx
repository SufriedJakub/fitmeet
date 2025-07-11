// screens/AccountScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const AccountScreen = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser) return;
      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Ładowanie profilu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Twój profil</Text>
      <Text style={styles.item}>👤 Imię: {userData.name}</Text>
      <Text style={styles.item}>📍 Miasto: {userData.city}</Text>
      <Text style={styles.item}>🏋️ Siłownia: {userData.gym}</Text>
      <Text style={styles.item}>🎯 Cel: {userData.goal}</Text>

      <Button title="Wyloguj się" color="red" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  item: { fontSize: 18, marginBottom: 15 },
});

export default AccountScreen;

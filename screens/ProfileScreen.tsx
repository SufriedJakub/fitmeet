// screens/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const ProfileScreen = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();

  const { uid } = route.params as { uid: string };

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

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
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.info}>📍 Miasto: {userData.city}</Text>
      <Text style={styles.info}>🏋️ Siłownia: {userData.gym}</Text>
      <Text style={styles.info}>🎯 Cel: {userData.goal}</Text>
      <Text style={styles.info}>🚻 Płeć: {userData.gender}</Text>

      <Button title="Powrót" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  name: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  info: { fontSize: 18, textAlign: 'center', marginBottom: 10 },
});

export default ProfileScreen;

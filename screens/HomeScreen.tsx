// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import SwipeCard from '../components/SwipeCard';

const HomeScreen = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      const myDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', currentUser.uid)));
      const myData = myDoc.docs[0].data();
      const gender = myData.gender;

      const q = query(
        collection(db, 'users'),
        where('gender', '==', gender),
        where('uid', '!=', currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const fetchedUsers = querySnapshot.docs.map(doc => doc.data());
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Błąd pobierania użytkowników:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text>Ładowanie użytkowników...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dopasuj gym bro/sis</Text>
      {users.length === 0 && <Text>Brak osób do wyświetlenia 😔</Text>}
      {users.map((user, index) => (
        <SwipeCard
          key={index}
          name={user.name}
          gym={user.gym}
          goal={user.goal}
          city={user.city}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
});

export default HomeScreen;

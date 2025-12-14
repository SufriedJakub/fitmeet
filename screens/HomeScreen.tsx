// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import SwipeCard from '../components/SwipeCard';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const HomeScreen = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchUsers = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      setLoading(true);
      // 1. Pobieramy WSZYSTKICH użytkowników (proste zapytanie, bez błędów indeksów)
      const querySnapshot = await getDocs(collection(db, 'users'));
      
      const allUsers = querySnapshot.docs.map(doc => doc.data());

      // 2. Filtrujemy lokalnie (wyrzucamy siebie z listy)
      // Możesz tu też dodać filtr płci: && u.gender !== myGender
      const filteredUsers = allUsers.filter((u: any) => u.uid !== currentUser.uid);

      setUsers(filteredUsers);
    } catch (error: any) {
      console.error('Błąd:', error);
      Alert.alert('Błąd pobierania', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipeRight = async (userSwiped: any) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      // Zapisz swipe
      await setDoc(doc(db, 'swipes', `${currentUser.uid}_${userSwiped.uid}`), {
        from: currentUser.uid,
        to: userSwiped.uid,
        timestamp: new Date(),
      });

      // Sprawdź czy jest match
      const reverseSwipe = await getDoc(doc(db, 'swipes', `${userSwiped.uid}_${currentUser.uid}`));

      if (reverseSwipe.exists()) {
        const matchId = [currentUser.uid, userSwiped.uid].sort().join('_');
        await setDoc(doc(db, 'matches', matchId), {
          users: [currentUser.uid, userSwiped.uid],
          createdAt: new Date(),
        });
        
        Alert.alert("MATCH! 🔥", "Masz parę! Przenoszę do czatu.");
        // @ts-ignore
        navigation.navigate('Chat', { matchId });
      }
    } catch (error) {
      console.log('Błąd swipe:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Szukam gym bros...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Dopasuj Gym Partnera</Text>
      
      {users.length === 0 ? (
        <Text style={styles.info}>Brak nowych osób w okolicy 😔</Text>
      ) : (
        users.map((user, index) => (
          <SwipeCard
            key={index}
            name={user.name || 'Nieznajomy'}
            gym={user.gym || 'Brak danych'}
            goal={user.goal || 'Brak danych'}
            city={user.city || 'Brak danych'}
            onSwipeRight={() => handleSwipeRight(user)}
            onSwipeLeft={() => console.log('Lewo')}
          />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 50 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 10 },
  info: { textAlign: 'center', marginTop: 50, fontSize: 18, color: 'gray' },
});

export default HomeScreen;

// screens/MatchesScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
} from 'react-native';
import { auth, db } from '../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const MatchesScreen = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const navigation = useNavigation();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'matches'),
      where('users', 'array-contains', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMatches(data);
    });

    return unsubscribe;
  }, []);

  const getOtherUser = (users: string[]) =>
    users.find((uid) => uid !== currentUser?.uid);

  const handleOpenChat = (matchId: string) => {
    navigation.navigate('Chat', { matchId });
  };

  const handleViewProfile = (uid: string) => {
    navigation.navigate('Profile', { uid });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Twoje dopasowania</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const otherUid = getOtherUser(item.users);
          return (
            <View style={styles.card}>
              <Text style={styles.text}>Match ID: {item.id}</Text>
              <Button title="Czat" onPress={() => handleOpenChat(item.id)} />
              <Button title="Zobacz profil" onPress={() => handleViewProfile(otherUid!)} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
  },
  text: { fontSize: 16, marginBottom: 10 },
});

export default MatchesScreen;

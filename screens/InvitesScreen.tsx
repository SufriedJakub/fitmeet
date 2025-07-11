// screens/InvitesScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

const InvitesScreen = () => {
  const [invites, setInvites] = useState<any[]>([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'messages'),
      where('type', '==', 'invite'),
      where('matchId', '>=', ''), // żeby nie filtrować na tym etapie
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filtered = snapshot.docs
        .map((doc) => doc.data())
        .filter((msg) => msg.sender === currentUser.uid || msg.to === currentUser.uid);
      setInvites(filtered);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Twoje zaproszenia</Text>
      <FlatList
        data={invites}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.sub}>Od: {item.sender === currentUser?.uid ? 'Ty' : 'Ktoś inny'}</Text>
          </View>
        )}
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
    backgroundColor: '#e8f0ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  text: { fontSize: 16, marginBottom: 5 },
  sub: { fontSize: 14, color: '#555' },
});

export default InvitesScreen;

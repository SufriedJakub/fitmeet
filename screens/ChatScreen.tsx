// screens/ChatScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, Button, StyleSheet } from 'react-native';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const ChatScreen = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  const currentUser = auth.currentUser;
  const dummyMatchId = 'user1_user2'; // 👈 to na razie test, później dynamicznie

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where('matchId', '==', dummyMatchId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '' || !currentUser) return;

    await addDoc(collection(db, 'messages'), {
      matchId: dummyMatchId,
      sender: currentUser.uid,
      text: input,
      createdAt: serverTimestamp(),
    });

    setInput('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text
            style={{
              textAlign: item.sender === currentUser?.uid ? 'right' : 'left',
              marginVertical: 5,
            }}
          >
            {item.text}
          </Text>
        )}
        keyExtractor={(_, i) => i.toString()}
      />

      <TextInput
        placeholder="Napisz wiadomość..."
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      <Button title="Wyślij" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingBottom: 60 },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default ChatScreen;

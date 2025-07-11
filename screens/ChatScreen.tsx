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
import { useRoute } from '@react-navigation/native';
import GymInviteModal from '../components/GymInviteModal';

const ChatScreen = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const currentUser = auth.currentUser;
  const route = useRoute();
  const { matchId } = route.params as { matchId: string };

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where('matchId', '==', matchId),
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
      matchId,
      sender: currentUser.uid,
      text: input,
      type: 'text',
      createdAt: serverTimestamp(),
    });

    setInput('');
  };

  const sendInvite = async (data: { date: string; time: string; location: string }) => {
    if (!currentUser) return;

    const inviteMessage = `📅 Trening: ${data.date} o ${data.time} w ${data.location}`;
    await addDoc(collection(db, 'messages'), {
      matchId,
      sender: currentUser.uid,
      text: inviteMessage,
      type: 'invite',
      createdAt: serverTimestamp(),
    });
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
              fontWeight: item.type === 'invite' ? 'bold' : 'normal',
              color: item.type === 'invite' ? '#007AFF' : '#000',
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
      <Button title="Zaproponuj trening" color="green" onPress={() => setModalVisible(true)} />

      <GymInviteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={sendInvite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingBottom: 60 },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default ChatScreen;

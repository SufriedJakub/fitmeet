// components/GymInviteModal.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { date: string; time: string; location: string }) => void;
}

const GymInviteModal = ({ visible, onClose, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const handleSend = () => {
    if (!date || !time || !location) return;
    onSubmit({ date, time, location });
    setDate('');
    setTime('');
    setLocation('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Zaproponuj trening</Text>
        <TextInput
          placeholder="Data (np. 2025-07-10)"
          style={styles.input}
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          placeholder="Godzina (np. 18:00)"
          style={styles.input}
          value={time}
          onChangeText={setTime}
        />
        <TextInput
          placeholder="Siłownia (np. Zdrofit Wola)"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
        <Button title="Wyślij zaproszenie" onPress={handleSend} />
        <Button title="Anuluj" color="gray" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { borderBottomWidth: 1, marginBottom: 20, fontSize: 16 },
});

export default GymInviteModal;

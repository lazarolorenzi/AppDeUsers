import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Certifique-se de que as props estão sendo passadas corretamente para `UserCard`
const UserCard = ({ user, onPressDetails, onPressEdit, onPressDelete }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      {/* Botões para Detalhes, Editar e Excluir */}
      <View style={styles.buttonContainer}>
        <Button title="Detalhes" onPress={onPressDetails} />
        <Button title="Editar" onPress={onPressEdit} color="orange" />
        <Button title="Excluir" onPress={onPressDelete} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default UserCard;

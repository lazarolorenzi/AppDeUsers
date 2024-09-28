import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserCard = ({ user, onPressDetails, onPressEdit, onPressDelete }: any) => {
  return (
    <View style={styles.card}>
    
      <View style={styles.highlightLine} />
      
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.detailsButton]} onPress={onPressDetails}>
          <Text style={styles.buttonText}>Detalhes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={onPressEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onPressDelete}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  highlightLine: {
    height: 4,
    backgroundColor: '#000', 
    borderTopLeftRadius: 12, 
    borderTopRightRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  email: {
    color: '#666',
    marginBottom: 12,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20, 
  },
  detailsButton: {
    backgroundColor: '#007bff',
  },
  editButton: {
    backgroundColor: '#ffc107',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default UserCard;

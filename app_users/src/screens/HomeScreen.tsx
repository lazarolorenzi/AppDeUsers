import React, { useState, useCallback } from 'react';
import { View, FlatList, Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import UserCard from '../components/UserCard';
import { useFocusEffect } from '@react-navigation/native';

// Definindo o tipo User
interface User {
  id: number;
  name: string;
  email: string;
  login: string;
  city: string;
}

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.1.117:3000/users');
      setUsers(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os usuários.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`http://192.168.1.117:3000/users/${userId}`);
      Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      {/* FlatList minimalista */}
      <FlatList
        data={users}
        keyExtractor={(user) => user.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPressDetails={() => navigation.navigate('UserDetails', { userId: item.id })}
            onPressEdit={() => navigation.navigate('EditUser', { userId: item.id })}
            onPressDelete={() => deleteUser(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2', // Fundo claro para melhor contraste
    paddingHorizontal: 16,
  },
  list: {
    paddingBottom: 16,
  },
});

export default HomeScreen;

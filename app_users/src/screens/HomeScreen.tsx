import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, Alert, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import UserCard from '../components/UserCard';

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.1.117:3000/users');
        setUsers(response.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os usuários.');
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`http://192.168.1.117/users/${userId}`);
      Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o usuário.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>

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
      />
    </View>
  );
};

export default HomeScreen;

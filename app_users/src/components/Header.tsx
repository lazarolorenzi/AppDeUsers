import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, Alert, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

// Importar UserCard para exibir os dados do usuário
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
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os usuários.');
      }
    };

    fetchUsers();
  }, []);

  // Função para excluir um usuário
  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o usuário.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Botão para navegar para tela de Adicionar Usuário */}
      <Button
        title="Adicionar Novo Usuário"
        onPress={() => navigation.navigate('AddUser')}
      />

      {/* Lista de Usuários */}
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

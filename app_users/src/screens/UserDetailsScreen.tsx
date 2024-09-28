import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';

const UserDetailsScreen = ({ route }: { route: any }) => {
  const { userId } = route.params;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.1.117/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do usuário.');
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Nome: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Login: {user.login}</Text>
      <Text>Cidade: {user.city}</Text>
    </View>
  );
};

export default UserDetailsScreen;

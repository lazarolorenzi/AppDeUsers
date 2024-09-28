import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Corrigir importação do Picker

const EditUserScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { userId } = route.params; // Pegamos o userId da rota
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    // Função para buscar os dados do usuário por ID
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://192.168.1.117/users/${userId}`);
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setLogin(user.login);
        setPassword(user.password);
        setCity(user.city);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    };
    fetchUser();
  }, [userId]);

  const updateUser = async () => {
    try {
      await axios.put(`http://192.168.1.117/users/${userId}`, {
        name,
        email,
        login,
        password,
        city,
      });
      Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
      navigation.goBack(); // Volta para a tela anterior após atualizar o usuário
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o usuário.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Picker
        selectedValue={city}
        onValueChange={(itemValue) => setCity(itemValue)}
        style={{ height: 50, width: '100%', marginBottom: 10 }}
      >
        <Picker.Item label="Selecione uma cidade" value="" />
        <Picker.Item label="São Paulo" value="São Paulo" />
        <Picker.Item label="Rio de Janeiro" value="Rio de Janeiro" />
        <Picker.Item label="Belo Horizonte" value="Belo Horizonte" />
      </Picker>
      <Button title="Atualizar Usuário" onPress={updateUser} />
    </View>
  );
};

export default EditUserScreen;

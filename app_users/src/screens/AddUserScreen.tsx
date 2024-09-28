import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Corrigir importação do Picker

const AddUserScreen = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');

  const addUser = async () => {
    try {
      await axios.post('http://localhost:3000/users', {
        name,
        email,
        login,
        password,
        city,
      });
      Alert.alert('Sucesso', 'Usuário adicionado com sucesso!');
      navigation.goBack(); // Volta para a tela anterior após adicionar o usuário
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Novo Usuário</Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Picker
        selectedValue={city}
        onValueChange={(itemValue) => setCity(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione uma cidade" value="" />
        <Picker.Item label="São Paulo" value="São Paulo" />
        <Picker.Item label="Rio de Janeiro" value="Rio de Janeiro" />
        <Picker.Item label="Belo Horizonte" value="Belo Horizonte" />
      </Picker>
      <Button title="Adicionar Usuário" onPress={addUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default AddUserScreen;

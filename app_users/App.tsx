import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

// Importando as telas do projeto
import HomeScreen from "./src/screens/HomeScreen";
import UserDetailsScreen from "./src/screens/UserDetailsScreen";
import AboutScreen from "./src/screens/AboutScreen";
import AddUserScreen from "./src/screens/AddUserScreen";
import EditUserScreen from "./src/screens/EditUserScreen";

// Definindo os parâmetros que as telas esperam
type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
  AddUser: undefined;
  EditUser: { userId: number };
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      {/* Aba Home */}
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          tabBarLabel: "Início",
        }}
      />
      
      {/* Aba para Adicionar Usuário */}
      <Tab.Screen
        name="AddUserTab"
        component={AddUserScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-circle-outline" color={color} size={size} />
          ),
          tabBarLabel: "Adicionar",
        }}
      />

      {/* Aba About */}
      <Tab.Screen
        name="AboutTab"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="information-circle-outline" color={color} size={size} />
          ),
          tabBarLabel: "Sobre",
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetailsScreen}
        options={{ title: "Detalhes do Usuário" }}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUserScreen}
        options={{ title: "Editar Usuário" }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      {/* Inicia a navegação usando o Stack que contém as Tabs */}
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default App;

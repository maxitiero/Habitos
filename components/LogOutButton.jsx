import React from 'react';
import {  View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { auth } from '../firebaseConfig';  
import { useNavigation } from '@react-navigation/native'

const LogOutButton = ({ onLogout }) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("Usuario cerrado sesión exitosamente.");
      navigation.navigate("login"); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}></Text>
      <Button 
        icon="logout"
        mode="contained"
        onPress={handleLogout}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        style={styles.button}
      >
        Cerrar Sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#F44336', // Color principal del botón
    borderRadius: 25, // Bordes redondeados
    elevation: 3, // Efecto de sombra
  },
  buttonContent: {
    height: 50, // Ajusta la altura del botón
  },
  buttonLabel: {
    fontSize: 16,
    color: '#FFF', // Cambia el color del texto del botón
    fontWeight: 'bold',
  },
});

export default LogOutButton;

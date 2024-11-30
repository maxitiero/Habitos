import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { auth } from '../firebaseConfig';  // Asegúrate de importar tu archivo de configuración de Firebase
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
      <Text style={styles.header}>Cerrar Sesión</Text>
      <Button mode="contained" onPress={handleLogout} style={styles.button}>
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
  },
  button: {
    width: '100%',
  },
});

export default LogOutButton;

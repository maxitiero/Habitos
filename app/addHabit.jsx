import React, { useState } from 'react'; 
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { auth } from '../firebaseConfig'; 


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#000' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#FFF', marginBottom: 16 },
  input: { marginBottom: 16, backgroundColor: '#1e1e1e', color: '#FFFFFF' },
  saveButton: { marginTop: 16, backgroundColor: '#007AFF' },
  label: {
    color: '#FFF',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  importanceOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});


const AddHabit = ({ }) => {
  
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState('Baja');
  /*const [days, setDays] = useState({
    Lun: false, Mar: false, Mie: false, Jue: false, Vie: false, Sab: false, Dom: false,
  });*/

  
  const userEmail = "usuario@ejemplo.com";
  const saveHabit = async () => {
    try {
      const currentUser = auth.currentUser;
    const userEmail = currentUser ? currentUser.email : null;

    if (!userEmail) {
      console.log("Usuario no autenticado.");
      return;
    }
      const newHabit = { title, description, importance};
      
       // Obtén los hábitos almacenados para este usuario en particular
    const storedHabits = await AsyncStorage.getItem(`habits_${userEmail}`);
    const habits = storedHabits ? JSON.parse(storedHabits) : [];

      // Agregar el nuevo hábito
      habits.push(newHabit);

      // Guarda los hábitos en AsyncStorage usando el correo como parte de la clave
    await AsyncStorage.setItem(`habits_${userEmail}`, JSON.stringify(habits));
    console.log("Hábito guardado exitosamente");

      // Navegar a la lista de hábitos
      navigation.navigate('habitList');
    } catch (error) {
      console.log("Error al guardar el hábito:", error);
    }
  };

  // Para cargar los hábitos específicos del usuario en otra pantalla
const fetchHabits = async () => {
  try {
    const storedHabits = await AsyncStorage.getItem(`habits_${userEmail}`);
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  } catch (error) {
    console.log("Error obteniendo los hábitos:", error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crear Hábito</Text>

      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        textColor="#FFFFFF"
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        textColor="#FFFFFF"
      />
      
      <View style={styles.row}>
        <Text style={styles.label}>Importancia</Text>
      </View>

      <View style={styles.importanceOptions}>
        {['Baja', 'Media', 'Alta'].map((option) => (
          <Button
            key={option}
            mode={importance === option ? 'contained' : 'outlined'}
            onPress={() => {
              setImportance(option);
              //saveSettings();
            }}
            style={styles.optionButton}
          >
            {option}
          </Button>
        ))}
      </View>

      <Button mode="contained" onPress={saveHabit} style={styles.saveButton}>
        Guardar
      </Button>
    </View>
  );
};

export default AddHabit;

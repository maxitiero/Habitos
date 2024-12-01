import React, { useState } from 'react'; 
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth } from '../firebaseConfig'; 

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#000' },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 16,
  },  
  input: { 
    marginBottom: 16, 
    backgroundColor: "#1e1e1e", 
    color: "#FFFFFF" 
  },
  saveButton: { marginTop: 16, backgroundColor: "#007AFF" },
  label: {
    color: "#FFF",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  importanceOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  optionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

const AddHabit = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const habit = route.params?.habit || null; // Verifica que route y params existan
  const [title, setTitle] = useState(habit?.title || '');
  const [description, setDescription] = useState(habit?.description || '');
  const [importance, setImportance] = useState(habit?.importance || 'Baja');

  const saveHabit = async () => {
    try {
      const currentUser  = auth.currentUser ;
      const userEmail = currentUser  ? currentUser .email : null;

      if (!userEmail) {
        console.log("Usuario no autenticado.");
        return;
      }

      const newHabit = { title, description, importance };
      const storedHabits = await AsyncStorage.getItem(`habits_${userEmail}`);
      const habits = storedHabits ? JSON.parse(storedHabits) : [];

      if (habit) {
        // Si estamos editando, actualizamos el hábito
        const updatedHabits = habits.map(h => (h.title === habit.title ? newHabit : h));
        await AsyncStorage.setItem(`habits_${userEmail}`, JSON.stringify(updatedHabits));
      } else {
        // Si estamos agregando un nuevo hábito
        habits.push(newHabit);
        await AsyncStorage.setItem(`habits_${userEmail}`, JSON.stringify(habits));
      }

      console.log("Hábito guardado exitosamente");
      navigation.navigate('habitList'); // Navegar a la lista de hábitos
    } catch (error) {
      console.log("Error al guardar el hábito:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{habit ? 'Editar Hábito' : 'Agregar Hábito'}</Text>
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
            onPress={() => setImportance(option)}
            style={styles.optionButton}
          >
            {option}
          </Button>
        ))}
      </View>
      <Button 
        mode="contained" 
        onPress ={saveHabit} 
        style={styles.saveButton}
      >
        Guardar
      </Button>
    </View>
  );
};

export default AddHabit;
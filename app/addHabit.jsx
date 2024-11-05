import React, { useState, useEffect } from 'react'; 
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, Switch, Text, TouchableRipple, IconButton } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#1e1e1e',
    color: '#FFFFFF',
  },
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
  repeatOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  days: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: '15px',
  },
  dayButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  selectText: {
    color: '#FFF',
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: '#007AFF',
  },
});

const AddHabit = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [repeat, setRepeat] = useState('Daily');
  const [days, setDays] = useState({
    Lun: false,
    Mar: false,
    Mie: false,
    Jue: false,
    Vie: false,
    Sab: false,
    Dom: false,
  });

  // Cargar configuración guardada al iniciar el componente
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTitle = await AsyncStorage.getItem('title');
        const savedDescription = await AsyncStorage.getItem('description');
        const savedColor = await AsyncStorage.getItem('color');
        const savedRepeat = await AsyncStorage.getItem('repeat');
        const savedDays = await AsyncStorage.getItem('days');
        
        if (savedTitle) setTitle(savedTitle);
        if (savedDescription) setDescription(savedDescription);
        if (savedColor) setColor(savedColor);
        if (savedRepeat) setRepeat(savedRepeat);
        if (savedDays) setDays(JSON.parse(savedDays));
      } catch (error) {
        console.log("Error loading settings:", error);
      }
    };

    loadSettings();
  }, []);

  // Guardar configuración al actualizar el estado
  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('title', title);
      await AsyncStorage.setItem('description', description);
      await AsyncStorage.setItem('color', color);
      await AsyncStorage.setItem('repeat', repeat);
      await AsyncStorage.setItem('days', JSON.stringify(days));
      console.log("Settings saved successfully");
    } catch (error) {
      console.log("Error saving settings:", error);
    }
  };

  const toggleDay = (day) => {
    setDays((prevDays) => {
      const newDays = { ...prevDays, [day]: !prevDays[day] };
      saveSettings();  // Guardar configuración cuando se cambian los días
      return newDays;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crear Hábito</Text>

      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          saveSettings();
        }}
        style={styles.input}
        textColor="#FFFFFF"
      />

      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          saveSettings();
        }}
        style={[styles.input, { color: '#FFFFFF' }]}
        textColor="#FFFFFF"
      />

      <View style={styles.row}>
        <Text style={styles.label}>Prioridad</Text>
      </View>

      <View style={styles.repeatOptions}>
        {['Baja', 'Media', 'Alta'].map((option) => (
          <Button
            key={option}
            mode={repeat === option ? 'contained' : 'outlined'}
            onPress={() => {
              setRepeat(option);
              saveSettings();
            }}
            style={styles.optionButton}
          >
            {option}
          </Button>
        ))}
      </View>

      <Text style={styles.label}>Repetir</Text>
      <View style={styles.days}>
        {Object.keys(days).map((day) => (
          <Button
            key={day}
            mode={days[day] ? 'contained' : 'outlined'}
            onPress={() => toggleDay(day)}
            style={styles.dayButton}
          >
            {day}
          </Button>
        ))}
      </View>

      <Button mode="contained" onPress={saveSettings} style={styles.saveButton}>
        Guardar
      </Button>
    </View>
  );
};

export default AddHabit;

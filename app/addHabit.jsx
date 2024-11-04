import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
    colorSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
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
  const [reminder, setReminder] = useState(false);
  const [goal, setGoal] = useState(false);
  const [routine, setRoutine] = useState('');

  const toggleDay = (day) => {
    setDays((prevDays) => ({ ...prevDays, [day]: !prevDays[day] }));
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
        style={[styles.input, { color: '#FFFFFF' }]}
        textColor="#FFFFFF" 
      />

      <TouchableRipple onPress={() => { 
        /* lógica de selección de color */ 
        }}
        >
        <View style={styles.colorSelector}>
          <Text style={styles.label}>Prioridad</Text>
          <IconButton icon="circle" color={color || 'gray'} size={30} />
        </View>
      </TouchableRipple>

      <View style={styles.row}>
        <Text style={styles.label}>Repetir</Text>
        <Switch value={repeat !== ''} onValueChange={(value) => setRepeat(value ? 'Diario' : '')} />
      </View>

      <View style={styles.repeatOptions}>
        {['Diario', 'Semanalmente', 'Mensualmente'].map((option) => (
          <Button
            key={option}
            mode={repeat === option ? 'contained' : 'outlined'}
            onPress={() => setRepeat(option)}
            style={styles.optionButton}
          >
            {option}
          </Button>
        ))}
      </View>

      <Text style={styles.label}>En estos días</Text>
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

      <View style={styles.row}>
        <Text style={styles.label}>Reminder</Text>
        <Switch value={reminder} onValueChange={setReminder} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Goal</Text>
        <Switch value={goal} onValueChange={setGoal} />
      </View>

      <TouchableRipple onPress={() => { /* lógica de rutina */ }}>
        <View style={styles.row}>
          <Text style={styles.label}>Rutina</Text>
          <Text style={styles.selectText}>Seleccionar</Text>
        </View>
      </TouchableRipple>

      <Button mode="contained" onPress={() => { /* lógica de guardar */

       }} style={styles.saveButton}>
        Guardar
      </Button>
    </View>
  );
};

export default AddHabit;

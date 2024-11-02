import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HabitDetail({ route, navigation }) {
    const { habit } = route.params;

    const handleEditHabit = () => {
        // Implementa la lógica para editar el hábito
    };

    const handleDeleteHabit = () => {
        // Implementa la lógica para eliminar el hábito
        navigation.goBack();
    };

    return (
        <View>
            <Text>Nombre: {habit.name}</Text>
            <Button title="Editar" onPress={handleEditHabit} />
            <Button title="Eliminar" onPress={handleDeleteHabit} />
        </View>
    );
}

import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSearchParams, useRouter } from 'expo-router';

export default function HabitDetail() {
    const { habit } = useSearchParams();
    const router = useRouter();

    const handleEditHabit = () => {
        // Implementa la lógica para editar el hábito
    };

    const handleDeleteHabit = () => {
        // Implementa la lógica para eliminar el hábito
        router.back();
    };

    return (
        <View>
            <Text>Nombre: {habit?.name}</Text>
            <Button title="Editar" onPress={handleEditHabit} />
            <Button title="Eliminar" onPress={handleDeleteHabit} />
        </View>
    );
}

import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddHabit() {
    const [habitName, setHabitName] = useState('');
    const router = useRouter();

    const handleAddHabit = () => {
        // Aquí puedes agregar lógica para guardar el hábito en el backend o AsyncStorage
        router.back(); // Usa router.back() para navegar hacia atrás
    };

    return (
        <View>
            <TextInput placeholder="Nombre del Hábito" value={habitName} onChangeText={setHabitName} />
            <Button title="Guardar Hábito" onPress={handleAddHabit} />
        </View>
    );
}

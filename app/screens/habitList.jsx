import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useRouter } from 'expo-router'; // Importa useRouter de expo-router
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de tener esto instalado

export default function HabitList() {
    const [habits, setHabits] = useState([]);
    const router = useRouter(); // Usa useRouter para navegar

    useEffect(() => {
        const loadHabits = async () => {
            try {
                const response = await AsyncStorage.getItem('habits');
                if (response) {
                    setHabits(JSON.parse(response));
                }
            } catch (error) {
                console.error("Error loading habits:", error);
            }
        };

        loadHabits();
    }, []);

    return (
        <View>
            <Button title="Agregar Hábito" onPress={() => router.push('/addHabit')} /> {/* Cambia a router.push */}
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id.toString()} // Asegúrate de que `id` sea un string
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Button title="Ver Detalles" onPress={() => router.push(`/habitDetail/${item.id}`)} /> {/* Cambia a router.push con el ID */}
                    </View>
                )}
            />
        </View>
    );
}

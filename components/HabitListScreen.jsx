import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';

export default function HabitListScreen({ navigation }) {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        // Aquí puedes agregar lógica para cargar hábitos desde una API o AsyncStorage
    }, []);

    return (
        <View>
            <Button title="Agregar Hábito" onPress={() => navigation.navigate('AddHabit')} />
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Button title="Ver Detalles" onPress={() => navigation.navigate('HabitDetail', { habit: item })} />
                    </View>
                )}
            />
        </View>
    );
}

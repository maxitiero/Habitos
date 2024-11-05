import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HabitItem from './habitItem';
import { useNavigation } from '@react-navigation/native';
import { auth } from "../firebaseConfig";

const styles = StyleSheet.create({
    button: { height: 40, width: "100%" },
    textContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    text: { textAlign: "center", fontSize: 16, padding: 20 },
});

const HabitList = () => {
    const navigation = useNavigation();
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const currentUser = auth.currentUser;
                const userEmail = currentUser ? currentUser.email : null;

                if (!userEmail) {
                    console.log("Usuario no autenticado.");
                    return;
                }
                const storedHabits = await AsyncStorage.getItem(`habits_${userEmail}`);
                if (storedHabits) {
                    setHabits(JSON.parse(storedHabits));
                } else {
                    setHabits([]);
                }
            } catch (error) {
                console.log("Error obteniendo los hábitos:", error);
            }
        };
        fetchHabits();
    }, []);

    const handleAddHabit = () => {
        navigation.navigate("addHabit");
    };

    return (
        <View style={{ flex: 1 }}>
            {habits.length === 0 ? (
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        No tiene hábitos cargados. Si desea agregar uno presione el botón Agregar Hábitos.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={habits}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <HabitItem
                            title={item.title}
                            description={item.description} // Asegúrate de que sea "description"
                            importance={item.importance} // Usar 'importance' ya que este es el campo de prioridad
                        />
                    )}
                />
            )}
            <View style={styles.textContainer}>
                <Button
                    style={styles.button}
                    onPress={handleAddHabit}
                    mode="contained"
                >
                    Agregar Hábito
                </Button>
            </View>
        </View>
    );
};

export default HabitList;

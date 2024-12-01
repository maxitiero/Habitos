import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HabitItem from './habitItem';
import { useNavigation } from '@react-navigation/native';
import { auth } from "../firebaseConfig";
import LogOutButton from "../components/LogOutButton";

const styles = StyleSheet.create({
    button: { height: 40, width: "100%" },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    text: { textAlign: "center", fontSize: 16, padding: 20 },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 16,
        alignItems: "center",
    },
    logOutContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
});

const HabitList = () => {
    const navigation = useNavigation();
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const currentUser  = auth.currentUser ;
                const userEmail = currentUser  ? currentUser .email : null;

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

    const handleEditHabit = (habit) => {
        navigation.navigate("addHabit", { habit }); // Pasar el hábito seleccionado a la pantalla de edición
    };

    const handleDeleteHabit = async (habitToDelete) => {
        const updatedHabits = habits.filter((habit) => habit !== habitToDelete);
        setHabits(updatedHabits);
        const currentUser  = auth.currentUser ;
        const userEmail = currentUser  ? currentUser .email : null;
        await AsyncStorage.setItem(`habits_${userEmail}`, JSON.stringify(updatedHabits));
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <View style={styles.logOutContainer}>
                    <LogOutButton />
                </View>
            </View>
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
                            description={item.description}
                            importance={item.importance}
                            onEdit={() => handleEditHabit(item)} 
                            onDelete={() => handleDeleteHabit(item)}
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
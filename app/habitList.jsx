import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Button, Modal } from 'react-native-paper';
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
    logOut: {
        alignSelf: 'center', // Esto asegura que el botón esté centrado verticalmente.
        marginLeft: 'auto', 
    },
});

const HabitList = () => {
    const navigation = useNavigation();
    const [habits, setHabits] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const currentUser = auth.currentUser;
                const userEmail = currentUser ? currentUser.email : null;

                if (!userEmail) {
                    console.log("Usuario no autenticado.");
                    return;
                }
                const storedHabits = await AsyncStorage.getItem(
                    `habits_${userEmail}`
                );
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

    const handleHabitPress = (habit) => {
        setSelectedHabit(habit);
        setModalVisible("true");
    };
    const handleDeleteHabit = async (habitToDelete) => {
        const updatedHabits = habits.filter((habit) => habit !== habitToDelete);
        setHabits(updatedHabits);
        const currentUser = auth.currentUser;
        const userEmail = currentUser ? currentUser.email : null;
        await AsyncStorage.setItem(
            `habits_${userEmail}`,
            JSON.stringify(updatedHabits)
        );
        setModalVisible(false);
    };

    // Función para manejar la navegación en logout
    const handleLogout = () => {
        navigation.navigate('Login');  // Redirigir a la pantalla de login después de cerrar sesión
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                {/* Botón de cerrar sesión */}
                {auth.currentUser && (
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <LogOutButton
                            style={styles.logOut}
                            onLogout={handleLogout}
                        />
                    </View>
                )}
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

            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContent}>
                    {selectedHabit && (
                        <>
                            <Text>
                                Título: {selectedHabit.title}
                            </Text>
                            <Text>
                                Descripción: {selectedHabit.description}
                            </Text>
                            <Text>
                                Importancia: {selectedHabit.importance}
                            </Text>
                            <Button
                                onPress={() => handleDeleteHabit(selectedHabit)}
                            >
                                Eliminar Hábito
                            </Button>
                            <Button
                                onPress={() =>
                                    navigation.navigate("addHabit", {
                                        habit: selectedHabit,
                                    })
                                }
                            >
                                Modificar Hábito
                            </Button>
                            <Button onPress={() => setModalVisible(false)}>
                                Cerrar
                            </Button>
                        </>
                    )}
                </View>
            </Modal>
        </View>
    );
};

export default HabitList;

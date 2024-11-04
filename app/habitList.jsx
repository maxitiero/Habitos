import React from "react";
import { Text, Button } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import HabitItem from "./habitItem";
import { View, FlatList, StyleSheet } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: "100%",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    text: {
        textAlign: "center",
        fontSize: 16,
        padding: 20,
    },
});
const HabitList = () => {
    const [habitos, setHabitos] = useState([]);
    const auth = getAuth();

    useEffect(() => {
        const fetchHabitos = async () => {
            const userId = auth.currentUser?.uid;
            if (!userId) return;
            const habitosQuery = query(
                collection(db, habitos),
                where("userId", "==", userId)
            );
            const querySnapshot = await getDocs(habitosQuery);
            const habitosData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setHabitos(habitosData);
        };
        fetchHabitos();
    }, []);

    const handleAddHabit = () => {};

    if (habitos.length === 0) {
        return (
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    No tiene habitos cargados. Si desea agregar uno presione el
                    boton Agregar Habitos
                </Text>
                <Button
                    style={styles.button}
                    title="Agregar Habito"
                    onPress={handleAddHabit}
                    mode="contained"
                >
                    Agregar Habito
                </Button>
            </View>
        );
    }

    return (
        <FlatList
            data={habitos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <HabitItem
                    descripcion={item.descripcion}
                    importancia={item.importancia}
                />
            )}
        />
    );
};

export default HabitList;

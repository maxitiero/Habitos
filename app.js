import "react-native-gesture-handler"; // Asegúrate de que esta línea esté primero
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeDatabase } from "./app/database/database";
import { RootStack } from "./app"

// Crear el stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        initializeDatabase(); // Inicializa la base de datos al cargar la aplicación
    }, []);

    return (
        <Stack.Navigator initialRouteName="Login">
            <RootStack />
        </Stack.Navigator>
    );
}

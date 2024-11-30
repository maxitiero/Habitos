import "react-native-gesture-handler"; // Asegúrate de que esta línea esté primero
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeDatabase } from "./app/database/database";
import Login from "./screens/Login";
import HabitDetail from "./app/screens/habitDetail";

// Crear el stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        initializeDatabase(); // Inicializa la base de datos al cargar la aplicación
    }, []);

    return (
        <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }} // Oculta el header para la pantalla de Login
        />
        <Stack.Screen
            name="Home"
            component={HabitDetail}
            options={{ headerShown: false }} // Oculta el header para la pantalla de Home
        />
    </Stack.Navigator>
    );
}

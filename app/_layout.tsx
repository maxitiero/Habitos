import React from "react";
import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
    return (
        <PaperProvider>
            <Stack initialRouteName="login">
                <Stack.Screen
                    name="login"
                    options={{ title: "Iniciar Sesion " }}
                />
                <Stack.Screen
                    name="register"
                    options={{ title: "Registrar" }}
                />
                <Stack.Screen
                    name="habitList"
                    options={{ title: "Lista de Habitos " }}
                />
                <Stack.Screen
                    name="habitDetail"
                    options={{ title: "Detalle de Habitos " }}
                />
                <Stack.Screen
                    name="addHabit"
                    options={{ title: "Añadir Habito" }}
                />
            </Stack>
        </PaperProvider>
    );
}

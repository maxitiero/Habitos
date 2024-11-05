import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./login"; // Ajusta la ruta según la ubicación del archivo
import Register from "./register";
import HabitList from "./habitList";
import HabitDetail from "./habitDetail";
import AddHabit from "./addHabit";

const Stack = createNativeStackNavigator();

export default function RootStack() {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="login" component={Login} options={{ title: "Iniciar Sesión" }} />
            <Stack.Screen name="register" component={Register} options={{ title: "Registrar" }} />
            <Stack.Screen name="habitList" component={HabitList} options={{ title: "Lista de Hábitos" }} />
            <Stack.Screen name="habitDetail" component={HabitDetail} options={{ title: "Detalle de Hábitos" }} />
            <Stack.Screen name="addHabit" component={AddHabit} options={{ title: "Añadir Hábito" }} />
        </Stack.Navigator>
        </NavigationContainer>
    );
}

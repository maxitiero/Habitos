import { initializeDatabase } from "./app/database/database";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import HabitDetail from "./app/screens/habitDetail";
// Pantalla principal después de iniciar sesión

const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        initializeDatabase();
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HabitDetail}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

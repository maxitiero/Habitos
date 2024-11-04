import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import RootStack from "./rootStack"; // Asegúrate de crear y configurar este archivo (explicado abajo)

// Define el tema personalizado
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#6200ee",
        text: "black",
        // Agrega otros colores que necesites personalizar
    },
};

const App = () => {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <RootStack />
            </NavigationContainer>
        </PaperProvider>
    );
};

export default App;
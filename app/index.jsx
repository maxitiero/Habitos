// app/index.jsx
import React from 'react';
import { Stack } from 'expo-router';

const App = () => {
    return (
        <Stack>
            <Stack.Screen name="login" options={{ title: 'Iniciar Sesión' }} />
            <Stack.Screen name="register" options={{ title: 'Registrar' }} />
        </Stack>
    );
};

export default App;

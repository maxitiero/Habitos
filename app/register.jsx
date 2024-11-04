import React, { useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextInput, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        text: 'black', // Cambiar el color del texto a negro
        primary: '#6200ee',
        // Puedes personalizar más colores aquí si lo deseas
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        width: "80%",
        alignItems: "center",
        marginHorizontal: "auto",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        width: "100%",
        backgroundColor: "#f0f0f0", //Cambia a un tono más claro
        color: "black", // Mantiene el color del texto
    },
    errorText: {
        color: "red",
        marginTop: 10,
    },

    buttonLogIn: {
        height: 40,
        width: "100%",
    },
    buttonSignUp: {
        height: 40,
        width: "100%",
    },
});

const Register = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const isValidPassword = (password) => {
        return password.length >= 8;
    };

    const handleRegister = () => {
        if (!isValidEmail(email)) {
            setError("La dirección de correo electrónico no es válida.");
            return;
        }

        if (!isValidPassword(password)) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Usuario registrado:", userCredential.user);
                Alert.alert(
                    "Éxito",
                    "Registro exitoso. Puedes iniciar sesión ahora."
                );
                // Redirigir después de un breve retraso
                setTimeout(() => {
                    navigation.navigate("login"); // Navegar a Login automáticamente
                }, 1500); // Espera 1.5 segundos (1500 ms)

                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                setError(error.message);
                console.error("Error de registro:", error);
            });
    };

    return (
        <PaperProvider theme={theme}>
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                theme={{ colors: { text: 'black' } }} // Cambiar el color del texto del input
            />
            <TextInput
                placeholder="Contraseña"
                placeholderTextColor="gray"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                theme={{ colors: { text: 'black' } }}
            />
            <Button
                style={styles.buttonSignUp}
                mode="contained"
                onPress={handleRegister}
            >
                Registrar
            </Button>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        </PaperProvider>
    );
};
export default Register;

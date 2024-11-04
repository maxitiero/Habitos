import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, TextInput, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        width: "80%",
        alignItems: "center", // Centra horizontalmente
        marginHorizontal: "auto", // Asegura que el contenedor esté centrado horizontalmente
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        width: "100%", //asegura que el input ocupe el 100% del contenedor
    },
    buttonLogIn: {
        height: 40,
        width: "100%",
    },
    errorText: {
        color: "red",
        marginTop: 10,
    },
    registerText: {
        marginTop: 20,
        textAlign: "center",
        color: 'black',
    },
});

const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const isValidPassword = (password) => {
        return password.length >= 8;
    };

    const handleLogin = async () => {
        console.log("handleLogin se ha llamado"); // Para depuración
        if (!email || !password) {
            setError("Por favor, ingresa tu email y contraseña.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("La dirección de correo electrónico no es válida.");
            return;
        }

        if (!isValidPassword(password)) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }
        setError("");
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log("Inicio de sesion exitoso", userCredential.user.email);

            // guardar email en async storage
            await AsyncStorage.setItem("userEmail", userCredential.user.email);

            // limpiar campos
            setEmail("");
            setPassword("");

            //navegar a la lista de habitos
            navigation.navigate("habitList");
        } catch (error) {
            console.log("Error de inicio de sesion", error);
            if (error.code === "auth/user-not-found") {
                Alert.alert(
                    "Error",
                    "no hay un usario registrado con ese correo."
                );
            } else if (error.code === "auth/wrong-password") {
                Alert.alert("Error", "La contraseña es incorrecta.");
            } else {
                Alert.alert("Error", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    setError(""); // Limpiar el mensaje de error cuando el usuario escribe
                }}
                style={styles.input}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    setError(""); // Limpiar el mensaje de error cuando el usuario escribe
                }}
                style={styles.input}
            />
            <Button
                style={styles.buttonLogIn}
                mode="contained"
                onPress={handleLogin}
            >
                Iniciar Sesión
            </Button>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Texto para dirigir al registro */}
            <Text style={styles.registerText}>
                ¿No tienes una cuenta?{" "}
                <Text
                    style={{ color: "blue", textDecorationLine: "underline" }}
                    onPress={() => {
                        navigation.navigate("register");
                    }}
                >
                    Crea una cuenta
                </Text>
            </Text>
        </View>
    );
};

export default Login;

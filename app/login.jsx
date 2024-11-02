import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        width: '80%',
        
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = () => {
        if (!email || !password) {
            setError('Por favor, ingresa tu email y contraseña.');
            return;
        }
        

        if (isValidEmail(email)) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log("Inicio de sesión exitoso:", userCredential.user);
                    // Limpia los campos
                    setEmail('');
                    setPassword('');
                })
                .catch((error) => {
                    if (error.code === 'auth/user-not-found') {
                        Alert.alert("Error", "No hay un usuario registrado con este correo.");
                    } else if (error.code === 'auth/wrong-password') {
                        Alert.alert("Error", "La contraseña es incorrecta.");
                    } else {
                        Alert.alert("Error", error.message);
                    }
                });
        } else {
            Alert.alert("Error", "La dirección de correo electrónico no es válida.");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
                style={styles.input} 
                autoCapitalize="none"
            />
            <TextInput 
                placeholder="Contraseña" 
                secureTextEntry 
                value={password} 
                onChangeText={setPassword} 
                style={styles.input} 
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

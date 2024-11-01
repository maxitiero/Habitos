import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            setError('Por favor, ingresa tu email y contraseña.');
            return;
        }
        
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Logged in!");
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
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

import React from "react";
import { Card, Text, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
    },
    content: {
        padding: 16,
        flexDirection: 'row',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginTop: '10px',
        fontSize: 16,
    },
    subtitle: {
        marginTop: '5px',
        color: 'gray',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    button: {
        flex: 1,
        marginHorizontal: 4,
    },
    textContainer: {
        flex: 1,
        marginRight: 8, 
    },
});

const HabitItem = ({ title, description, importance, onEdit, onDelete }) => (
    <Card style={styles.card}>
        <View style={styles.content}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.subtitle}>Importancia: {importance}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    icon="pencil"
                    mode="contained" 
                    onPress={onEdit} 
                    style={styles.button}
                >
                    Editar
                </Button>
                <Button 
                    icon="delete"
                    mode="outlined" 
                    onPress={onDelete} 
                    style={styles.button}
                >
                    Eliminar
                </Button>
            </View>
        </View>
    </Card>
);

export default HabitItem;

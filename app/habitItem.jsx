import React from "react";
import { Card, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginTop: '5px',
        fontSize: 16,
    },
    subtitle: {
        marginTop: '5px',
        color: 'gray',
    },
});

const HabitItem = ({ title, descripcion, importancia }) => (
    <Card style={styles.card}>
        <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{descripcion}</Text>
            <Text style={styles.subtitle}>Importancia: {importancia}</Text>
        </View>
    </Card>
);

export default HabitItem;

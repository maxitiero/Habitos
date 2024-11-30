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
        marginTop: '10px',
        fontSize: 16,
    },
    subtitle: {
        marginTop: '5px',
        color: 'gray',
    },
});

const HabitItem = ({ title, description, importance }) => (
    <Card style={styles.card}>
        <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.subtitle}>Importancia: {importance}</Text>
        </View>
    </Card>
);

export default HabitItem;

import React from "react";
import { Card, CardContent, Typography } from "react-native-paper";

const HabitItem = ({ descripcion, importancia }) => (
    <Card style={{ marginBottom: 10 }}>
        <CardContent>
            <Typography variant="h6">{descripcion}</Typography>
            <Typography color="textSecondary">
                Importancia: {importancia}
            </Typography>
        </CardContent>
    </Card>
);

export default HabitItem;

import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
import { Platform } from "react-native";

let db;
if (Platform.OS !== "web") {
    db = SQLite.openDatabase("habitos.db");
} else {
    console.log("SQLite no es compatible con el entorno web");
}

// Función para inicializar la base de datos
export const initializeDatabase = () => {
    if (Platform.OS === "web") return;
    db.transaction(
        (tx) => {
            // Crear tabla de importancia
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS importancia (
                    id_importancia INTEGER PRIMARY KEY NOT NULL,
                    nivel TEXT NOT NULL
                    );`,
                [],
                () => console.log("Tabla de importancia creada o ya existente"),
                (_, error) =>
                    console.error("Error al crear tabla importancia:", error)
            );

            // Crear tabla de hábitos con clave foránea a importancia
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS habitos (
                    id_habito INTEGER PRIMARY KEY AUTOINCREMENT,
                    description TEXT NOT NULL,
                    id_importancia INTEGER NOT NULL,
                    uid_usuario TEXT NOT NULL,
                    FOREIGN KEY (id_importancia) REFERENCES importancia(id_importancia)
                    );`,
                [],
                () => console.log("Tabla de hábitos creada o ya existente"),
                (_, error) =>
                    console.error("Error al crear tabla de hábitos:", error)
            );
        },
        null,
        precargarImportancia // Precargar datos una vez creadas las tablas
    );
};

// Función para precargar los datos en la tabla de importancia
const precargarImportancia = () => {
    if (Platform.OS === "web") return;
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT COUNT(*) AS count FROM importancia;",
            [],
            (_, { rows }) => {
                if (rows.item(0).count === 0) {
                    // Insertar valores iniciales de importancia
                    tx.executeSql(
                        "INSERT INTO importancia (id_importancia, nivel) VALUES (1, 'Baja');"
                    );
                    tx.executeSql(
                        "INSERT INTO importancia (id_importancia, nivel) VALUES (2, 'Media');"
                    );
                    tx.executeSql(
                        "INSERT INTO importancia (id_importancia, nivel) VALUES (3, 'Alta');"
                    );
                    console.log("Datos de importancia precargados.");
                } else {
                    console.log("La tabla importancia ya tiene datos.");
                }
            },
            (_, error) =>
                console.error("Error al verificar tabla importancia:", error)
        );
    });
};

// Exportar la base de datos para usar en otros archivos si es necesario
export default db;

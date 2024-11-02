import { AppRegistry } from "react-native";
import App from "./App"; // Asegúrate de que App.js esté en la misma ubicación
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);

import { Stack } from "expo-router";
import { Provider as PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack initialRouteName="login">
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="habitList" />
        <Stack.Screen name="habitDetail" />
        <Stack.Screen name="addHabit" />
      </Stack>
    </PaperProvider>
  );
}

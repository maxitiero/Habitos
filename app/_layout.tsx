import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="index"/>
      <Stack.Screen name="login"/>
      <Stack.Screen name="habitList"/>
      <Stack.Screen name="habitDetail" />
      <Stack.Screen name="addHabit" />
    </Stack>
  );
}

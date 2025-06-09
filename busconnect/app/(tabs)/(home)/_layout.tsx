import { Stack } from "expo-router";

export default function HomeRootLayout() {
    return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="viagem" options={{ headerShown: false }} />
      <Stack.Screen name="visualizarViagem" options={{ headerShown: false }} />
    </Stack>
  );
}
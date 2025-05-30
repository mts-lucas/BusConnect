import { Slot, Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/home" options={{ headerShown: false }} />
    </Stack>
  );
}
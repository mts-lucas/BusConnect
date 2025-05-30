import { Slot, Stack } from 'expo-router';

export default function AuthRootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
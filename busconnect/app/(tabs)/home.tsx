import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Home' }} />
      <Text style={styles.title}>Bem-vindo à Home!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.grayDark,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.yellowDark,
  },
});
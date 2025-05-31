import { useState } from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Logo } from '../../components/Logo';
import { LoginForm } from '../../components/LoginForm';
import { COLORS } from '../../constants/colors';

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Simula um tempo de carregamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Stack.Screen options={{ headerShown: false }} />
        
        <View style={styles.content}>
          <Logo style={styles.logo} />
          <LoginForm onSubmit={handleSubmit} loading={loading} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.grayDark,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 4,
  },
});
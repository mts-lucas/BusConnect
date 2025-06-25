import { useState } from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Logo } from '../../components/Logo';
import { LoginForm } from '../../components/LoginForm';
import { COLORS } from '../../constants/colors';
import { auth } from '../../firebaseConfig';

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)/(home)');
    } catch (error: any) {
      let errorMessage = "Ocorreu um erro ao fazer login";
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = "Email inválido";
          break;
        case 'auth/user-disabled':
          errorMessage = "Usuário desativado";
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = "Email ou senha incorretos";
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
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
          <LoginForm onSubmit={signIn} loading={loading} />
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
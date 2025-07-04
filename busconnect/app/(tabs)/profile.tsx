// busconnect/app/(tabs)/profile.tsx
import React, { useEffect, useState } from 'react'; // Importe useEffect e useState
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, Text, View, Alert} from 'react-native'; // Importe ActivityIndicator e Text, View
import { Stack, useRouter } from 'expo-router'; // Adicione useRouter
import { StudentProfileForm } from '../../components/profile/StudentProfileForm';
import { DriverProfileForm } from '../../components/profile/DriverProfileForm'; // Importe o componente do Motorista
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext'; // Importe o useAuth
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Importe Firestore
import { app } from '../../firebaseConfig'; // Sua instância do Firebase App

// Inicialize o Firestore
const db = getFirestore(app);

export default function ProfileScreen() {
  const router = useRouter(); // Adicione useRouter para redirecionamento
  const { user, loading: authLoading } = useAuth(); // Obtenha o user e o estado de carregamento do AuthContext
  const [userProfileData, setUserProfileData] = useState<any | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Verifica se a autenticação terminou e se há um usuário logado
      if (!authLoading && user) {
        setProfileLoading(true);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUserProfileData(data);
            setUserRole(data.role as string); // Assume que 'role' é uma string
          } else {
            console.warn("Documento de perfil do usuário não encontrado no Firestore para UID:", user.uid);
            setUserProfileData(null);
            setUserRole(null);
            Alert.alert("Erro de Perfil", "Seu perfil não foi encontrado. Entre em contato com o suporte.");
          }
        } catch (error) {
          console.error("Erro ao buscar o perfil do usuário:", error);
          setUserProfileData(null);
          setUserRole(null);
          Alert.alert("Erro", "Ocorreu um erro ao carregar seu perfil.");
        } finally {
          setProfileLoading(false);
        }
      } else if (!authLoading && !user) {
        // Se a autenticação terminou e não há usuário, redirecione para a tela de login
        router.replace('/(auth)'); 
      }
    };

    fetchUserProfile();
  }, [user, authLoading]); // Dependências: executa quando o user ou authLoading mudam

  // Exibe um indicador de carregamento enquanto os dados estão sendo buscados
  if (authLoading || profileLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ 
            title: 'Meu Perfil',
            headerStyle: { backgroundColor: COLORS.grayDark },
            headerTintColor: COLORS.white,
        }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.yellowDark} />
          <Text style={{ color: COLORS.yellowDark, marginTop: 10 }}>Carregando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Se não houver usuário logado (deveria ser pego pelo router.replace acima, mas é um fallback)
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ 
            title: 'Meu Perfil',
            headerStyle: { backgroundColor: COLORS.grayDark },
            headerTintColor: COLORS.white,
        }} />
        <View style={styles.loadingContainer}>
          <Text style={{ color: COLORS.redDark }}>Você não está logado. Redirecionando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Objeto de dados para passar aos formulários, ajustando o campo 'senha'
  const initialFormData = userProfileData ? {
    ...userProfileData,
    email: userProfileData.email || user.email || '', // Garante que o email do Auth seja um fallback
    nome: userProfileData.name || user.displayName || '', // Prioriza 'name' do Firestore, depois displayName
    senha: '', // Senha nunca deve ser exibida, envie vazio ou remova do tipo
    fotoUrl: userProfileData.fotoUrl || "https://randomuser.me/api/portraits/men/1.jpg" // Fallback para foto
  } : null;


  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        title: 'Meu Perfil',
        headerStyle: {
          backgroundColor: COLORS.grayDark,
        },
        headerTintColor: COLORS.white,
      }} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {userRole === "student" && initialFormData ? (
          <StudentProfileForm initialData={initialFormData} />
        ) : userRole === "driver" && initialFormData ? (
          <DriverProfileForm initialData={initialFormData} />
        ) : (
          <Text style={styles.errorMessage}>
            Não foi possível carregar seu perfil ou seu tipo de usuário é desconhecido.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayDark,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  }
});
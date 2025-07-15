import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { GreetingHeader } from '../../../components/home/GreetingHeader';
import { HomeCard } from '../../../components/home/HomeCard';
import { COLORS } from '../../../constants/colors';
import { useAuth } from '../../../context/AuthContext';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from '../../../firebaseConfig';

const db = getFirestore(app);

export default function HomeScreen() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  // Mude userRole para userProfileData para armazenar o objeto completo
  const [userProfileData, setUserProfileData] = useState<any | null>(null); // Armazena os dados do perfil do Firestore
  const [profileLoading, setProfileLoading] = useState(true); // Novo estado de loading para o perfil

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authLoading && user) {
        setProfileLoading(true); // Ativa o loading do perfil
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserProfileData(userDocSnap.data()); // Armazena todos os dados do perfil
          } else {
            console.warn("Documento de perfil do usuário não encontrado no Firestore para UID:", user.uid);
            setUserProfileData(null);
          }
        } catch (error) {
          console.error("Erro ao buscar o perfil do usuário:", error);
          setUserProfileData(null);
        } finally {
          setProfileLoading(false); // Desativa o loading do perfil
        }
      } else if (!authLoading && !user) {
        router.replace('/(auth)');
      }
    };

    fetchUserProfile();
  }, [user, authLoading]);

  // Exiba um indicador de carregamento enquanto autentica ou busca o perfil
  if (authLoading || profileLoading) { // Agora verifica profileLoading também
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.yellowDark} />
        <Text style={{ color: COLORS.yellowDark, marginTop: 10 }}>Carregando perfil...</Text>
      </View>
    );
  }

  // Se não houver usuário logado (e não estiver mais carregando), deve ser redirecionado pelo useEffect.
  // Este if é mais um fallback, mas o router.replace já deve ter agido.
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: COLORS.redDark }}>Nenhum usuário logado. Redirecionando...</Text>
      </View>
    );
  }

  // Define a role e o nome para uso mais fácil
  const userRole = userProfileData?.role as string;
  const userName = userProfileData?.name || user.displayName || user.email; // Prioriza 'name' do Firestore, depois displayName, depois email

  // Conteúdo específico para Motorista
  const DriverHomeContent = () => (
    <>
      <HomeCard
        title="Histórico de Viagens"
        description="Visualize suas viagens anteriores"
        onPress={() => router.push('/(tabs)/(home)/historico')}
        iconName="time"
      />
      <HomeCard
        title="Contatos"
        description="Entre em contato com a equipe"
        onPress={() => router.push('/(tabs)/(home)/contato')}
        iconName="call"
      />
      <HomeCard
        title="Viagem"
        description="Calendário de viagens"
        onPress={() => router.push('/(tabs)/(home)/viagem/viagem')}
        iconName="bus"
      />
    </>
  );

  // Conteúdo específico para Estudante
  const StudentHomeContent = () => (
    <>
      <HomeCard
        title="Confirmar Presença"
        description="Registre sua presença no ônibus"
        onPress={() => router.push('/(tabs)/(home)/confirmarPresenca')}
        iconName="checkmark-circle"
      />
      <HomeCard
        title="Histórico de Viagens"
        description="Visualize suas viagens anteriores"
        onPress={() => router.push('/(tabs)/(home)/historico')}
        iconName="time"
      />
      <HomeCard
        title="Contatos"
        description="Entre em contato com a equipe"
        onPress={() => router.push('/(tabs)/(home)/contato')}
        iconName="call"
      />
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: 'Home' }} />
      
      {/* Cabeçalho de saudação personalizado */}
      <GreetingHeader text={`Olá ${userName}!`} /> {/* <--- Alterado aqui */}
      
      <View style={styles.cardsContainer}>
        {userRole === "driver" ? (
          <DriverHomeContent />
        ) : userRole === "student" ? (
          <StudentHomeContent />
        ) : (
          <Text style={{ color: COLORS.redDark }}>Seu tipo de usuário não pôde ser determinado ou não é suportado para esta visualização.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: COLORS.grayDark,
  },
  cardsContainer: {
    gap: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grayDark,
  },
});
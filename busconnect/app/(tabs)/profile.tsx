import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StudentProfileForm } from '../../components/profile/StudentProfileForm';
import { DriverProfileForm } from '../../components/profile/DriverProfileForm';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc, DocumentData } from "firebase/firestore"; 
import { db } from '../../firebaseConfig'; //  
import { StudentUserData } from '../../components/profile/StudentProfileForm/types';
import { DriverUserData } from '../../components/profile/DriverProfileForm/types'; 

// Componente para exibir mensagens
const CustomModal = ({ message, onClose }: { message: string | null; onClose: () => void }) => {
  if (!message) return null;

  return (
    <View style={modalStyles.overlay}>
      <View style={modalStyles.container}>
        <Text style={modalStyles.message}>{message}</Text>
        <TouchableOpacity onPress={onClose} style={modalStyles.button}>
          <Text style={modalStyles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [userProfileData, setUserProfileData] = useState<StudentUserData | DriverUserData | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authLoading && user) {
        setProfileLoading(true);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data() as StudentUserData | DriverUserData;
            setUserProfileData(data);
            setUserRole(data.role as string);
          } else {
            console.warn("Documento de perfil do usuário não encontrado no Firestore para UID:", user.uid);
            setUserProfileData(null);
            setUserRole(null);
            setModalMessage("Seu perfil não foi encontrado. Entre em contato com o suporte.");
          }
        } catch (error) {
          console.error("Erro ao buscar o perfil do usuário:", error);
          setUserProfileData(null);
          setUserRole(null);
          setModalMessage("Ocorreu um erro ao carregar seu perfil.");
        } finally {
          setProfileLoading(false);
        }
      } else if (!authLoading && !user) {
        router.replace('/(auth)');
      }
    };

    fetchUserProfile();
  }, [user, authLoading]);

  // Função para fechar o modal
  const handleCloseModal = () => {
    setModalMessage(null);
  };

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

  const initialFormData = userProfileData ? {
    ...userProfileData,
    email: userProfileData.email || user.email || '',
    nome: (userRole === "driver" ? (userProfileData as DriverUserData).name : (userProfileData as StudentUserData).name) || user.displayName || '',
    senha: '',
    fotoUrl: userProfileData.fotoUrl || "https://placehold.co/100x100/CCCCCC/FFFFFF?text=Avatar" // Placeholder para avatar
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
          <StudentProfileForm initialData={initialFormData as StudentUserData} userUid={user.uid} />
        ) : userRole === "driver" && initialFormData ? (
          <DriverProfileForm initialData={initialFormData as DriverUserData} userUid={user.uid} />
        ) : (
          <Text style={styles.errorMessage}>
            Não foi possível carregar seu perfil ou seu tipo de usuário é desconhecido.
          </Text>
        )}
      </ScrollView>
      <CustomModal message={modalMessage} onClose={handleCloseModal} />
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

const modalStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    maxWidth: '80%',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.grayDark,
  },
  button: {
    backgroundColor: COLORS.yellowDark,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
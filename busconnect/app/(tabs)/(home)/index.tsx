import { View, StyleSheet, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router'; // Adicione useRouter
import { GreetingHeader } from '../../../components/home/GreetingHeader';
import { HomeCard } from '../../../components/home/HomeCard';
import { COLORS } from '../../../constants/colors';

export default function HomeScreen() {
  const router = useRouter(); // Inicialize o router

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: 'Home' }} />
      
      <GreetingHeader text="Olá Aluno!" />
      
      <View style={styles.cardsContainer}>
        <HomeCard
          title="Confirmar Presença"
          description="Registre sua presença no ônibus"
          onPress={() => console.log('Confirmar Presença pressionado')}
          iconName="checkmark-circle"
        />
        
        <HomeCard
          title="Histórico de Viagens"
          description="Visualize suas viagens anteriores"
          onPress={() => console.log('Histórico pressionado')}
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
          onPress={() => router.push('/(tabs)/(home)/viagem')} // Navegação direta aqui
          iconName="bus"
        />
      </View>
    </ScrollView>
  );
}

// Mantenha os estilos como estão

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: COLORS.grayDark,
  },
  cardsContainer: {
    gap: 16,
  },
});
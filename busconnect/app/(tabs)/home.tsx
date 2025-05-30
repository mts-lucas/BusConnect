import { View, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { GreetingHeader } from '../../components/home/GreetingHeader';
import { HomeCard } from '../../components/home/HomeCard';
import { COLORS } from '../../constants/colors';

export default function HomeScreen() {
  const handleCardPress = () => {
    console.log('Card pressionado');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: 'Home' }} />
      
      <GreetingHeader text="Olá Aluno!" />
      
      <View style={styles.cardsContainer}>
        <HomeCard
          title="Confirmar Presença"
          description="Registre sua presença no ônibus"
          onPress={handleCardPress}
          iconName="checkmark-circle"
        />
        
        <HomeCard
          title="Histórico de Viagens"
          description="Visualize suas viagens anteriores"
          onPress={handleCardPress}
          iconName="time"
        />
        
        <HomeCard
          title="Contatos"
          description="Entre em contato com a equipe"
          onPress={handleCardPress}
          iconName="call"
        />
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
});
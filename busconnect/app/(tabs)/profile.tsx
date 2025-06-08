import { SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import { Stack } from 'expo-router';
import { StudentProfileForm } from '../../components/profile/StudentProfileForm';
import { COLORS } from '../../constants/colors';

const MOCK_USER = {
  nome: "João da Silva",
  email: "joao.silva@email.com",
  senha: "********",
  telefone: "(11) 98765-4321",
  matricula: "2023001234",
  instituicao: "Universidade Federal",
  localidade: "São Paulo - SP",
  horarioAula: "Noturno",
  fotoUrl: "https://randomuser.me/api/portraits/men/1.jpg"
};

export default function StudentProfileScreen() {
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
        <StudentProfileForm initialData={MOCK_USER} />
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
  }
});
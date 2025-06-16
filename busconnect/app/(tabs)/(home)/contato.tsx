import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { COLORS } from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

// Tipos melhorados
type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface Contato {
  nome: string;
  funcao: string;
  telefone: string;
}

interface LinkItem {
  nome: string;
  icone: IoniconsName;
  cor: string;
  url: string;
}

export default function ContatoScreen() {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Dados separados para melhor organização
  const contatos: Contato[] = [
    {
      nome: "João Silva",
      funcao: "Motorista rota Caicó",
      telefone: "(84) 98765-4321"
    },
    {
      nome: "Maria Oliveira",
      funcao: "Motorista rota Assú",
      telefone: "(84) 91234-5678"
    },
  ];

  const links: LinkItem[] = [
    {
      nome: "Instagram Oficial",
      icone: "logo-instagram",
      cor: COLORS.DeepPink,
      url: 'https://www.instagram.com/bsiufrn?igsh=MXQ0ZWRwOGl1dXd4Yw=='
    },
    {
      nome: "Grupo do WhatsApp",
      icone: "logo-whatsapp",
      cor: COLORS.LimeGreen,
      url: 'https://wa.me/5584999999999'
    },
  ];

  // Função genérica para abrir links, basta adicionar uma url no const links
  const abrirLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Erro ao abrir link:", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Seção de Motoristas */}
      <Text style={styles.sectionTitle}>Motoristas</Text>
      
      {contatos.map((contato, index) => (
        <View key={`contato-${index}`} style={styles.contatoCard}>
          <View style={styles.infoContainer}>
            <Text style={styles.nome}>{contato.nome}</Text>
            <Text style={styles.funcao}>{contato.funcao}</Text>
            <View style={styles.telefoneContainer}>
              <Ionicons name="call" size={16} color={COLORS.white} />
              <Text style={styles.telefone}>{contato.telefone}</Text>
            </View>
          </View>
        </View>
      ))}
      
      {/* Seção de Links Úteis */}
      <Text style={styles.sectionTitle}>Nossos Links</Text>
      
      {links.map((link, index) => (
        <TouchableOpacity 
          key={`link-${index}`}
          style={[styles.linkCard, { backgroundColor: link.cor }]}
          onPress={() => abrirLink(link.url)}
          activeOpacity={0.8}
        >
          <View style={styles.linkContent}>
            <Ionicons name={link.icone} size={24} color={COLORS.white} />
            <Text style={styles.linkText}>{link.nome}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.white} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// Estilos otimizados
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: COLORS.grayDark,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 12,
    marginTop: 8,
  },
  contatoCard: {
    backgroundColor: COLORS.blueDark,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  funcao: {
    fontSize: 14,
    color: COLORS.white,
    marginBottom: 6,
  },
  telefoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  telefone: {
    fontSize: 14,
    color: COLORS.white,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  linkText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
});
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface Motorista {
  nome: string;
  foto: string;
  habilitacao: string;
}

interface Aluno {
  nome: string;
  foto: string;
  instituicao: string;
  matricula: string;
  volta: boolean;
}

interface ViagemCardProps {
  motorista: Motorista;
  alunos: Aluno[];
  rota: string;
  diaDaViagem: string;
}

export default function ViagemCard({ alunos, diaDaViagem, motorista, rota }: ViagemCardProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="calendar" size={24} color={COLORS.white} />
          <Text style={styles.title}>Viagem do dia {diaDaViagem}</Text>
        </View>
        
        <View style={styles.rotaContainer}>
          <Ionicons name="map" size={20} color={COLORS.white} />
          <Text style={styles.rota}>{rota}</Text>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person" size={20} color={COLORS.white} />
            <Text style={styles.sectionTitle}>Motorista</Text>
          </View>
          
          <View style={styles.motoristaCard}>
            <Image source={{ uri: motorista.foto }} style={styles.foto} />
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{motorista.nome}</Text>
              <View style={styles.detailRow}>
                <Ionicons name="card" size={16} color={COLORS.white} />
                <Text style={styles.detalhe}>Habilitação: {motorista.habilitacao}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={20} color={COLORS.white} />
            <Text style={styles.sectionTitle}>Alunos ({alunos.length})</Text>
          </View>
          
          <View style={styles.alunosList}>
            {alunos.map((aluno, index) => (
              <View key={index} style={styles.alunoCard}>
                <Image source={{ uri: aluno.foto }} style={styles.foto} />
                <View style={styles.infoContainer}>
                  <Text style={styles.nome}>{aluno.nome}</Text>
                  
                  <View style={styles.detailRow}>
                    <Ionicons name="school" size={16} color={COLORS.white} />
                    <Text style={styles.detalhe}>{aluno.instituicao}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Ionicons name="id-card" size={16} color={COLORS.white} />
                    <Text style={styles.detalhe}>{aluno.matricula}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Ionicons 
                      name={aluno.volta ? "sync-circle" : "arrow-forward-circle"} 
                      size={16} 
                      color={aluno.volta ? COLORS.white : COLORS.white} 
                    />
                    <Text style={[
                      styles.detalhe,
                      { color: aluno.volta ? COLORS.white : COLORS.white }
                    ]}>
                      {aluno.volta ? 'Ida e volta' : 'Somente ida'}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayDark,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  rotaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  rota: {
    fontSize: 14,
    color: COLORS.white,
    flexShrink: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  motoristaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.yellowDark,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  alunosList: {
    gap: 10,
  },
  alunoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.yellowDark,
    borderRadius: 10,
    padding: 15,
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  detalhe: {
    fontSize: 12,
    color: COLORS.white,
  },
});
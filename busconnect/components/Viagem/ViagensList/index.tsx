// busconnect/components/Viagem/ViagensList/index.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'; // Importar FlatList
import { COLORS } from '../../../constants/colors';
import { Viagem, Rota, PresencaAluno } from '../types'; // Importar Viagem e Rota
import { ViagemItem } from '../ViagemItem';

interface ViagensListProps {
  // Ajuste o tipo para receber a Viagem completa
  viagens: (Viagem & { rotaData?: Rota, minhaPresenca?: PresencaAluno })[]; 
  selectedDate: string;
  // Ajuste o tipo do callback
  onViagemPress: (viagem: (Viagem & { rotaData?: Rota, minhaPresenca?: PresencaAluno })) => void; 
}

export const ViagensList: React.FC<ViagensListProps> = ({ viagens, selectedDate, onViagemPress }) => {
  if (viagens.length === 0) return null;

  return (
    <View style={styles.listaContainer}>
      <Text style={styles.tituloLista}>Viagens em {selectedDate}:</Text>
      
      <FlatList // Use FlatList para melhor performance
        data={viagens}
        keyExtractor={(item) => item.id!} // Garanta que 'id' exista e seja uma string
        renderItem={({ item }) => (
          <ViagemItem
            viagem={item}
            onPress={() => onViagemPress(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listaContainer: {
    marginTop: 20,
    flex: 1, // Importante para FlatList
  },
  tituloLista: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
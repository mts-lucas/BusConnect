import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { Viagem } from '../types';
import { ViagemItem } from '../ViagemItem';

interface ViagensListProps {
  viagens: Viagem[];
  selectedDate: string;
  onViagemPress: (viagem: Viagem) => void;
}

export const ViagensList: React.FC<ViagensListProps> = ({ viagens, selectedDate, onViagemPress }) => {
  if (viagens.length === 0) return null;

  return (
    <View style={styles.listaContainer}>
      <Text style={styles.tituloLista}>Viagens em {selectedDate}:</Text>
      
      {viagens.map((viagem, index) => (
        <ViagemItem
          key={index}
          viagem={viagem}
          onPress={() => onViagemPress(viagem)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listaContainer: {
    marginTop: 20,
  },
  tituloLista: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});


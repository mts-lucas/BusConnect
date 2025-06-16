import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Viagem } from '../types';
import { styles } from './styles';

interface ViagemItemProps {
  viagem: Viagem;
  onPress: () => void;
}

export const ViagemItem: React.FC<ViagemItemProps> = ({ viagem, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.itemLista,
        viagem.presenca && styles.itemConfirmado
      ]}
      onPress={onPress}
    >
      <Text style={styles.textoItem}>
        <Text style={styles.textoNegrito}>Rota: </Text>
        {viagem.rota.origem} - {viagem.rota.destino}
      </Text>
      <Text style={styles.textoItem}>
        <Text style={styles.textoNegrito}>Turno: </Text>
        {viagem.turno}
      </Text>
      {viagem.presenca?.horarioSaida && (
        <Text style={styles.textoItem}>
          <Text style={styles.textoNegrito}>Saída: </Text>
          {viagem.presenca.horarioSaida}
        </Text>
      )}
      <Text style={styles.textoItem}>
        <Text style={styles.textoNegrito}>Status: </Text>
        {viagem.presenca ? 'Presença confirmada' : 'Aguardando confirmação'}
      </Text>
    </TouchableOpacity>
  );
};



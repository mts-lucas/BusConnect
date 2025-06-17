import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Viagem } from '../types';
import { styles } from './styles';

interface ViagemItemProps {
  viagem: Viagem;
  onPress: () => void;
}

export const ViagemItem: React.FC<ViagemItemProps> = ({ viagem, onPress }) => {

  const getTipoViagem = () => {
    if (!viagem.presenca) return 'Aguardando confirmação';
    
    const { ida, volta } = viagem.presenca;
    if (ida && volta) return 'Ida e Volta';
    if (ida) return 'Ida';
    if (volta) return 'Volta';
    
    return 'Tipo não especificado';
  };

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
      <Text style={styles.textoItem}>
        <Text style={styles.textoNegrito}>Situação: </Text>
        {getTipoViagem()}
      </Text>
      {viagem.presenca?.horarioSaida && (
        <Text style={styles.textoItem}>
          <Text style={styles.textoNegrito}>Saída: </Text>
          {viagem.presenca.horarioSaida}
        </Text>
      )}
    </TouchableOpacity>
  );
};
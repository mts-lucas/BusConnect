// busconnect/components/Viagem/ViagemItem/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Viagem, Rota, PresencaAluno } from '../types'; // Importar os novos tipos
import { styles } from './styles';

interface ViagemItemProps {
  // Ajuste o tipo para receber a Viagem completa
  viagem: (Viagem & { rotaData?: Rota, minhaPresenca?: PresencaAluno }); 
  onPress: () => void;
}

export const ViagemItem: React.FC<ViagemItemProps> = ({ viagem, onPress }) => {

  const getTipoPresenca = () => { // Renomeado para clareza
    if (!viagem.minhaPresenca) return 'Aguardando confirmação';
    
    const { ida, volta } = viagem.minhaPresenca; // Usar minhaPresenca
    if (ida && volta) return 'Ida e Volta';
    if (ida) return 'Ida';
    if (volta) return 'Volta';
    
    return 'Tipo não especificado';
  };

  return (
    <TouchableOpacity
      style={[
        styles.itemLista,
        viagem.minhaPresenca && styles.itemConfirmado // Usar minhaPresenca
      ]}
      onPress={onPress}
    >
      <Text style={styles.textoItem}>
        <Text style={styles.textoNegrito}>Rota: </Text>
        {viagem.rotaData ? `${viagem.rotaData.origem} - ${viagem.rotaData.destino}` : 'Carregando Rota...'} {/* Usar rotaData */}
      </Text>
      <Text style={styles.textoItem}>
        <Text style={styles.textoNegrito}>Horário: </Text> {/* Mudei de Turno para Horário, conforme Viagem.horario */}
        {viagem.horario}
      </Text>
      <Text style={styles.textoItem}>
        <Text style={styles.textoNegrito}>Situação: </Text>
        {getTipoPresenca()}
      </Text>
      {viagem.minhaPresenca?.horarioSaida && ( // Usar minhaPresenca
        <Text style={styles.textoItem}>
          <Text style={styles.textoNegrito}>Saída: </Text>
          {viagem.minhaPresenca.horarioSaida}
        </Text>
      )}
    </TouchableOpacity>
  );
};
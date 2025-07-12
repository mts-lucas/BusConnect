import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

export interface BotaoViagemProps {
  tipo: 'editar' | 'excluir';
  tamanho: number;
  onPress: () => void;
  disabled?: boolean;
}

export const BotaoViagem: React.FC<BotaoViagemProps> = ({ 
  tipo, 
  onPress, 
  tamanho = 40 
}) => {
  const icone = tipo === 'editar' ? 'pencil' : 'trash';
  const estiloBotao = tipo === 'editar' ? styles.botaoEditar : styles.botaoExcluir;

  return (
    <TouchableOpacity 
      style={[estiloBotao, { width: tamanho, height: tamanho, borderRadius: tamanho / 2 }]}
      onPress={onPress}
    >
      <Ionicons name={icone} size={tamanho * 0.66} color="white" />
    </TouchableOpacity>
  );
};
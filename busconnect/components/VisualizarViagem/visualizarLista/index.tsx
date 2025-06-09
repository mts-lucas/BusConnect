import React from 'react';
import { View } from 'react-native';
import { viagens } from '../../../mocks/data';
import ViagemCard from '../visualizarCard';

export const VisualizarLista: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      {viagens.map((viagem, index) => (
        <ViagemCard
          key={index}
          diaDaViagem={viagem.diaDaViagem}
          rota={viagem.rota}
          motorista={viagem.motorista}
          alunos={viagem.alunos}
        />
      ))}
    </View>
  );
};
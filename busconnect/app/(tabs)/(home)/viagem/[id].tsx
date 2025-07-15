import React, { useState, useEffect }  from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { doc, getDoc, DocumentReference } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { Viagem, Rota, PresencaAluno } from '../../../../components/Viagem/types';
import { DriverUserData } from '../../../../components/profile/DriverProfileForm/types';
import ViagemCard from '../../../../components/VisualizarViagem/visualizarCard';
import { COLORS } from '../../../../constants/colors';

export default function ViagemDetalhesScreen() {
  const { id } = useLocalSearchParams();
  const [viagem, setViagem] = useState< (Viagem & {rotaData?: Rota; motoristaData?: DriverUserData; presencasAlunos?: PresencaAluno[]}) | null >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') {
      setError("ID da viagem inválido.");
      setLoading(false);
      return;
    }

    const carregarDetalhesViagem = async () => {
      try {
        setLoading(true);
        setError(null);

        const viagemRef = doc(db, 'viagens', id);
        const viagemSnap = await getDoc(viagemRef);

        if (!viagemSnap.exists()) {
          setError("Viagem não encontrada.");
          setLoading(false);
          return;
        }

        const viagemData = viagemSnap.data() as Viagem;

        // Load route data
        let rotaData: Rota | undefined;
        if (viagemData.rota instanceof DocumentReference) {
          const rotaSnap = await getDoc(viagemData.rota);
          rotaData = rotaSnap.exists() ? { id: rotaSnap.id, ...rotaSnap.data() } as Rota : undefined;
        } else {
          rotaData = viagemData.rota;
        }

        // Load driver data
        let motoristaData: DriverUserData | undefined;
        if (viagemData.motorista instanceof DocumentReference) {
          const motoristaSnap = await getDoc(viagemData.motorista);
          motoristaData = motoristaSnap.exists() ? motoristaSnap.data() as DriverUserData : undefined;
        } else {
          motoristaData = viagemData.motorista;
        }


        const alunosPresentesFormatados: PresencaAluno[] = await Promise.all(
          (viagemData.presencasAlunos || []).map(async (presenca) => {
            let fotoUrlAluno: string | undefined = undefined;
            if (presenca.estudanteRef instanceof DocumentReference) {
              const estudanteSnap = await getDoc(presenca.estudanteRef);
              if (estudanteSnap.exists()) {
                fotoUrlAluno = estudanteSnap.data()?.fotoUrl;
              }
            }
            
            return {
              ...presenca, 
              fotoUrl: fotoUrlAluno, 
            } as PresencaAluno & { fotoUrl?: string };
          })
        );

        setViagem({
          id: viagemSnap.id,
          ...viagemData,
          rotaData: rotaData,
          motoristaData: motoristaData,
          presencasAlunos: alunosPresentesFormatados
        });

      } catch (err) {
        console.error("Erro ao carregar detalhes da viagem:", err);
        setError("Erro ao carregar detalhes da viagem.");
      } finally {
        setLoading(false);
      }
    };

    carregarDetalhesViagem();
  }, [id]);

  if (loading) {
    return (
      <View style={detalheStyles.container}>
        <ActivityIndicator size="large" color={COLORS.white} />
        <Text style={detalheStyles.loadingText}>Carregando detalhes da viagem...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={detalheStyles.container}>
        <Text style={detalheStyles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!viagem) {
    return (
      <View style={detalheStyles.container}>
        <Text style={detalheStyles.errorText}>Viagem não encontrada.</Text>
      </View>
    );
  }

  // Prepare data for ViagemCard (adapt interfaces)
  const motoristaParaCard = {
    nome: viagem.motoristaData?.name || 'Motorista Desconhecido',
    foto: viagem.motoristaData?.fotoUrl || 'https://placehold.co/50x50/CCCCCC/FFFFFF?text=Avatar', 
    habilitacao: viagem.motoristaData?.licenseNumber || 'N/A'
  };

  const alunosParaCard = viagem.presencasAlunos?.map(alunoPresenca => ({
    nome: alunoPresenca.nomeEstudante || 'Aluno Desconhecido',
    foto: alunoPresenca.fotoUrl || 'https://placehold.co/50x50/CCCCCC/FFFFFF?text=Aluno',
    instituicao: alunoPresenca.instituicao || 'Não informada',
    matricula: alunoPresenca.registration || 'Não informada',
    volta: alunoPresenca.volta,
    horarioSaida: alunoPresenca.horarioSaida,
  })) || [];


  return (
    <View style={detalheStyles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          title: 'Viagem',
          headerStyle: {
            backgroundColor: COLORS.grayDark,
          },
          headerTintColor: COLORS.yellowDark,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      /> 

      <ViagemCard
        motorista={motoristaParaCard}
        alunos={alunosParaCard}
        rota={viagem.rotaData ? `${viagem.rotaData.origem} - ${viagem.rotaData.destino}` : 'Rota Desconhecida'}
        diaDaViagem={viagem.data}
      />
    </View>
  );
}

const detalheStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.grayDark,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    loadingText: {
        marginTop: 10,
        color: COLORS.white,
        fontSize: 16
    },
    errorText: {
        marginTop: 10,
        color: COLORS.red,
        fontSize: 16
    }
});

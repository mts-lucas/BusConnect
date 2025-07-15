import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { collection, query, getDocs, doc, getDoc, DocumentReference } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useAuth } from '../../../context/AuthContext';
import { Viagem, Rota, PresencaAluno } from '../../../components/Viagem/types';
import { DriverUserData } from '../../../components/profile/DriverProfileForm/types';
import { COLORS } from '../../../constants/colors';
import { Stack, useRouter } from 'expo-router'; // Importe Stack e useRouter

export default function HistoricoViagensScreen() {
  const [historicoViagens, setHistoricoViagens] = useState<(Viagem & { rotaData?: Rota; motoristaData?: DriverUserData; minhaPresenca?: PresencaAluno })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const carregarHistoricoViagens = async () => {
      if (!user) {
        setLoading(false);
        setError("Usuário não autenticado.");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const q = query(collection(db, 'viagens'));
        const querySnapshot = await getDocs(q);

        const viagensDoUsuario: (Viagem & { rotaData?: Rota; motoristaData?: DriverUserData; minhaPresenca?: PresencaAluno })[] = [];

        for (const docFirebase of querySnapshot.docs) {
          const data = docFirebase.data() as Viagem;

          const minhaPresenca = data.presencasAlunos?.find(
            p => (p.estudanteRef as DocumentReference).id === user.uid
          );

          const isMotoristaDaViagem = data.motorista instanceof DocumentReference && data.motorista.id === user.uid;

          if (minhaPresenca || isMotoristaDaViagem) {
            let rotaData: Rota | undefined;
            if (data.rota instanceof DocumentReference) {
              const rotaSnap = await getDoc(data.rota);
              rotaData = rotaSnap.exists() ? rotaSnap.data() as Rota : undefined;
            } else {
              rotaData = data.rota;
            }

            let motoristaData: DriverUserData | undefined;
            if (data.motorista instanceof DocumentReference) {
              const motoristaSnap = await getDoc(data.motorista);
              motoristaData = motoristaSnap.exists() ? motoristaSnap.data() as DriverUserData : undefined;
            } else {
              motoristaData = data.motorista;
            }

            viagensDoUsuario.push({
              id: docFirebase.id,
              ...data,
              rotaData,
              motoristaData,
              minhaPresenca
            });
          }
        }
        setHistoricoViagens(viagensDoUsuario);

      } catch (err) {
        console.error("Erro ao carregar histórico de viagens:", err);
        setError("Não foi possível carregar o histórico de viagens.");
      } finally {
        setLoading(false);
      }
    };

    carregarHistoricoViagens();
  }, [user]); 

  if (loading) {
    return (
      <View style={historicoStyles.container}>
        <ActivityIndicator size="large" color={COLORS.white} />
        <Text style={historicoStyles.loadingText}>Carregando histórico de viagens...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={historicoStyles.container}>
        <Text style={historicoStyles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={historicoStyles.container}>
      <Stack.Screen options={{ headerShown: false }} /> 

      <Text style={historicoStyles.titulo}>Meu Histórico de Viagens</Text>

      {historicoViagens.length === 0 ? (
        <Text style={historicoStyles.emptyText}>Nenhuma viagem encontrada no seu histórico.</Text>
      ) : (
        <FlatList
          data={historicoViagens}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={historicoStyles.itemLista}
              onPress={() => router.push(`/viagem/${item.id}`)}
            >
              <View style={historicoStyles.itemContent}>
                <Text style={historicoStyles.itemTitulo}>
                  Rota: {item.rotaData ? `${item.rotaData.origem} - ${item.rotaData.destino}` : 'Rota Desconhecida'}
                </Text>
                <Text style={historicoStyles.itemTexto}>Data: {item.data}</Text>
                <Text style={historicoStyles.itemTexto}>Horário: {item.horario}</Text>
                <Text style={historicoStyles.itemTexto}>
                  Motorista: {item.motoristaData?.name || 'Desconhecido'}
                  {item.motoristaData?.name === user?.displayName && ' (Você)'}
                </Text>
                
                {item.minhaPresenca ? (
                  <View style={historicoStyles.presencaContainer}>
                    <Text style={historicoStyles.presencaTexto}>
                      Sua presença: {item.minhaPresenca.ida && item.minhaPresenca.volta ? 'Ida e Volta' : item.minhaPresenca.ida ? 'Somente Ida' : item.minhaPresenca.volta ? 'Somente Volta' : 'Não especificada'}
                    </Text>
                    {item.minhaPresenca.volta && item.minhaPresenca.horarioSaida && (
                      <Text style={historicoStyles.presencaTexto}>
                        Saída: {item.minhaPresenca.horarioSaida}
                      </Text>
                    )}
                  </View>
                ) : (
                  <View style={historicoStyles.presencaContainer}>
                    <Text style={historicoStyles.presencaTexto}>
                      Você foi o motorista desta viagem.
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </View>
  );
}

const historicoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayDark,
    padding: 16,
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.white,
    fontSize: 16,
  },
  errorText: {
    marginTop: 10,
    color: COLORS.red,
    fontSize: 16,
    textAlign: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  itemLista: {
    backgroundColor: COLORS.blueDark,
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  itemContent: {
    // 
  },
  itemTitulo: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemTexto: {
    color: COLORS.white,
    fontSize: 14,
    marginBottom: 3,
  },
  presencaContainer: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  presencaTexto: {
    color: COLORS.yellowLight,
    fontSize: 13,
  }
});

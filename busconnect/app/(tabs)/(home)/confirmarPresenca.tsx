// busconnect/app/(tabs)/(home)/confirmarPresenca.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { COLORS } from '../../../constants/colors';
import CalendarViagem from '../../../components/Viagem/CalendarViagem';
import { Viagem, Rota, PresencaAluno } from '../../../components/Viagem/types';
import { ViagensList } from '../../../components/Viagem/ViagensList';
import { ConfirmarPresencaModal } from '../../../components/Viagem/ConfirmarPresencaModal';
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion, arrayRemove, getDoc, DocumentReference } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useAuth } from '../../../context/AuthContext';

// Importe o Stack do expo-router
import { Stack } from 'expo-router'; // <--- ADICIONE ESTA LINHA

export default function ConfirmarPresencaScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viagens, setViagens] = useState<(Viagem & { rotaData?: Rota, minhaPresenca?: PresencaAluno })[]>([]);
  const [selectedViagem, setSelectedViagem] = useState<(Viagem & { rotaData?: Rota, minhaPresenca?: PresencaAluno }) | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [horarioSaida, setHorarioSaida] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const carregarViagens = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const q = query(collection(db, 'viagens'), where('data', '==', selectedDate));
      const querySnapshot = await getDocs(q);

      const viagensData = await Promise.all(
        querySnapshot.docs.map(async (docFirebase) => {
          const data = docFirebase.data() as Viagem;
          
          let rotaData: Rota | undefined;
          if (data.rota instanceof DocumentReference) {
            const rotaSnap = await getDoc(data.rota);
            rotaData = rotaSnap.exists() ? rotaSnap.data() as Rota : undefined;
          } else {
            rotaData = data.rota;
          }

          const minhaPresenca = data.presencasAlunos?.find(
            p => (p.estudanteRef as DocumentReference).id === user.uid
          );
          
          return {
            id: docFirebase.id,
            ...data,
            rotaData,
            minhaPresenca,
          } as Viagem & { rotaData?: Rota, minhaPresenca?: PresencaAluno };
        })
      );
      setViagens(viagensData);
    } catch (error) {
      console.error("Erro ao carregar viagens para presença:", error);
      Alert.alert("Erro", "Não foi possível carregar as viagens.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarViagens();
  }, [selectedDate, user]);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const handleViagemPress = (viagem: Viagem & { rotaData?: Rota, minhaPresenca?: PresencaAluno }) => {
    setSelectedViagem(viagem);
    setHorarioSaida(viagem.minhaPresenca?.horarioSaida || '');
    setModalVisible(true);
  };

  const confirmarPresenca = async (presencaStatus: { ida: boolean; volta: boolean }) => {
    if (!selectedViagem?.id || !user?.uid) {
      Alert.alert("Erro", "Viagem ou usuário não identificado.");
      return;
    }
    if (loading) return;

    try {
      setLoading(true);
      const viagemRef = doc(db, 'viagens', selectedViagem.id);
      const estudanteRef = doc(db, 'users', user.uid);

      const novaPresenca: PresencaAluno = {
        estudanteRef: estudanteRef,
        nomeEstudante: user.displayName || user.email || 'Estudante Desconhecido',
        ida: presencaStatus.ida,
        volta: presencaStatus.volta,
        horarioSaida: presencaStatus.volta ? horarioSaida : null,
        timestampConfirmacao: new Date(),
      };

      if (selectedViagem.minhaPresenca) {
        await updateDoc(viagemRef, {
          presencasAlunos: arrayRemove(selectedViagem.minhaPresenca)
        });
      }
      
      await updateDoc(viagemRef, {
        presencasAlunos: arrayUnion(novaPresenca)
      });

      Alert.alert("Sucesso", "Presença confirmada!");
      setModalVisible(false);
      await carregarViagens(); 
    } catch (error) {
      console.error("Erro ao confirmar presença:", error);
      Alert.alert("Erro", "Não foi possível confirmar a presença.");
    } finally {
      setLoading(false);
    }
  };

  const cancelarPresenca = async () => {
    if (!selectedViagem?.id || !user?.uid || !selectedViagem.minhaPresenca) {
      Alert.alert("Erro", "Nenhuma presença para cancelar ou viagem/usuário não identificado.");
      return;
    }
    if (loading) return;

    try {
      setLoading(true);
      const viagemRef = doc(db, 'viagens', selectedViagem.id);

      await updateDoc(viagemRef, {
        presencasAlunos: arrayRemove(selectedViagem.minhaPresenca)
      });

      Alert.alert("Sucesso", "Presença cancelada!");
      setModalVisible(false);
      await carregarViagens();
    } catch (error) {
      console.error("Erro ao cancelar presença:", error);
      Alert.alert("Erro", "Não foi possível cancelar a presença.");
    } finally {
      setLoading(false);
    }
  };

  const viagensDoDia = viagens.filter(v => v.data === selectedDate);

  return (
    <View style={styles.container}>
      {/* ADICIONE ESTE COMPONENTE PARA REMOVER O CABEÇALHO */}
      <Stack.Screen options={{ headerShown: false }} /> 

      <CalendarViagem
        onDayPress={handleDayPress}
        markedDates={{
          ...viagens.reduce((acc, viagem) => ({
            ...acc,
            [viagem.data]: { 
              marked: true, 
              dotColor: viagem.minhaPresenca ? COLORS.greenDark : COLORS.yellowLight 
            }
          }), {}),
          [selectedDate]: {
            selected: true,
            selectedColor: COLORS.yellowDark,
            selectedTextColor: COLORS.grayDark,
          }
        }}
      />

      {loading && viagensDoDia.length === 0 ? (
        <Text style={styles.carregando}>Carregando viagens...</Text>
      ) : (
        <ViagensList 
          viagens={viagensDoDia}
          selectedDate={selectedDate} 
          onViagemPress={handleViagemPress} 
        />
      )}

      <ConfirmarPresencaModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        viagem={selectedViagem}
        horarioSaida={horarioSaida}
        setHorarioSaida={setHorarioSaida}
        onConfirm={confirmarPresenca}
        onCancelPresenca={cancelarPresenca}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayDark,
    padding: 16,
  },
  carregando: {
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 20,
  },
});
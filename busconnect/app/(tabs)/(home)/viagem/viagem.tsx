import { Alert, StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CalendarViagem from '../../../../components/Viagem/CalendarViagem';
import { BotaoViagem } from '../../../../components/Viagem/BotaoViagem';
import { ModalConfirmacao } from '../../../../components/Viagem/ModalConfirmacao';
import { ModalEdicao } from '../../../../components/Viagem/ModalEdicao';
// Importe Stack aqui
import { useRouter, Stack } from 'expo-router'; 
import { Viagem, Rota } from '../../../../components/Viagem/types';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { useAuth } from '../../../../context/AuthContext';
import { DriverUserData } from '../../../../components/profile/DriverProfileForm/types';
import { DocumentReference } from "firebase/firestore";

export default function ViagemScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  const [rotaSelecionada, setRotaSelecionada] = useState<Rota | null>(null);
  const [horario, setHorario] = useState('');
  const [viagens, setViagens] = useState<(Viagem & {rotaData?: Rota; motoristaData?: DriverUserData})[]>([]);
  const [rotas, setRotas] = useState<Rota[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [viagemParaExcluir, setViagemParaExcluir] = useState<Viagem | null>(null);
  const [modalEdicaoVisivel, setModalEdicaoVisivel] = useState(false);
  const [viagemParaEditar, setViagemParaEditar] = useState<Viagem | null>(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { user } = useAuth();

  // Carrega rotas do Firestore
  useEffect(() => {
    const carregarRotas = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'rotas'));
        const rotasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Rota[];
        setRotas(rotasData);
      } catch (error) {
        console.error("Erro ao carregar rotas:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarRotas();
  }, []);

  // Carrega viagens do Firestore com dados relacionados
  const carregarViagens = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'viagens'), where('data', '==', selectedDate));
      const querySnapshot = await getDocs(q);
      
      const viagensData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          
          const [rotaSnap, motoristaSnap] = await Promise.all([
            getDoc(data.rota as DocumentReference),
            getDoc(data.motorista as DocumentReference)
          ]);
          
          return {
            id: doc.id,
            ...data,
            rotaData: rotaSnap.exists() ? {id: rotaSnap.id, ...rotaSnap.data()} as Rota : null,
            motoristaData: motoristaSnap.exists() ? motoristaSnap.data() as DriverUserData : null
          } as Viagem & {rotaData?: Rota; motoristaData?: DriverUserData};
        })
      );
      
      setViagens(viagensData);
    } catch (error) {
      console.error("Erro ao carregar viagens:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarViagens();
  }, [selectedDate]);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setShowForm(false);
  };

  const criarViagem = async () => {
    if (!rotaSelecionada || !rotaSelecionada.id || !user?.uid) {
      Alert.alert("Erro", "Selecione uma rota válida");
      return;
    }

    try {
      setLoading(true);
      
      const rotaRef = doc(db, 'rotas', rotaSelecionada.id);
      const motoristaRef = doc(db, 'users', user.uid);

      const novaViagem: Omit<Viagem, 'id'> = {
        data: selectedDate,
        rota: rotaRef,
        horario,
        status: 'Aberto',
        motorista: motoristaRef
      };

      await addDoc(collection(db, 'viagens'), novaViagem);
      Alert.alert("Sucesso", "Viagem criada com sucesso!");
      
      // Fecha o formulário/modal
      setShowForm(false);
      
      // Limpa os campos
      setRotaSelecionada(null);
      setHorario('');
      
      // Atualiza a lista de viagens
      await carregarViagens();
      
    } catch (error) {
      console.error("Erro ao criar viagem:", error);
      Alert.alert("Erro", "Não foi possível criar a viagem");
    } finally {
      setLoading(false);
    }
  };

  const confirmarExclusao = async () => {
    if (viagemParaExcluir?.id) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'viagens', viagemParaExcluir.id));
        Alert.alert("Sucesso", "Viagem deleda com sucesso!");
        await carregarViagens();
        setModalVisivel(false);
        setViagemParaExcluir(null);
      } catch (error) {
        console.error("Erro ao excluir viagem:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const iniciarEdicao = async (viagem: Viagem) => {
    try {
      setLoading(true);
      
      // Carrega os dados da rota a partir da referência
      const rotaSnap = await getDoc(viagem.rota as DocumentReference);
      const rotaData = rotaSnap.exists() ? {id: rotaSnap.id, ...rotaSnap.data()} as Rota : null;
      
      if (!rotaData) {
        throw new Error("Rota não encontrada");
      }

      setViagemParaEditar({
        ...viagem,
        rota: rotaData
      });
      setModalEdicaoVisivel(true);
    } catch (error) {
      console.error("Erro ao carregar dados da rota:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados da rota");
    } finally {
      setLoading(false);
    }
  };

  const confirmarEdicao = async (dadosEditados: { rota: Rota; horario: string; status: string }) => {
    if (!viagemParaEditar?.id || !dadosEditados.rota.id) {
      Alert.alert("Erro", "Dados inválidos para edição");
      return;
    }

    try {
      setLoading(true);
      const rotaRef = doc(db, 'rotas', dadosEditados.rota.id);
      
      await updateDoc(doc(db, 'viagens', viagemParaEditar.id), {
        horario: dadosEditados.horario,
        status: dadosEditados.status,
        rota: rotaRef
      });
      Alert.alert("Sucesso", "Viagem editada com sucesso!");
      
      await carregarViagens();
      setModalEdicaoVisivel(false);
      setViagemParaEditar(null);
    } catch (error) {
      console.error("Erro ao editar viagem:", error);
      Alert.alert("Erro", "Não foi possível editar a viagem");
    } finally {
      setLoading(false);
    }
  };

  const viagensDoDia = viagens.filter(v => v.data === selectedDate);

  return (
    <View style={styles.container}>
      {/* ADIÇÃO AQUI: Componente Stack.Screen para remover o cabeçalho */}
      <Stack.Screen options={{ headerShown: false }} /> 

      <CalendarViagem
        onDayPress={handleDayPress}
        markedDates={{
          ...viagens.reduce((acc, viagem) => ({
            ...acc,
            [viagem.data]: { marked: true, dotColor: COLORS.yellowLight }
          }), {}),
          [selectedDate]: {
            selected: true,
            selectedColor: COLORS.yellowDark,
            selectedTextColor: COLORS.grayDark,
            customStyles: {
              container: {
                borderRadius: 12,
              }
            }
          }
        }}
      />

      {!showForm ? (
        <TouchableOpacity
          style={styles.botao}
          onPress={() => setShowForm(true)}
          disabled={loading}
        >
          <Text style={styles.textoBotao}>
            {loading ? 'Carregando...' : 'Criar Viagem'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.titulo}>Nova Viagem: {selectedDate}</Text>

          <Text style={styles.label}>Rota:</Text>
          <Picker
            selectedValue={rotaSelecionada?.id || ''}
            onValueChange={(itemValue) => {
              const rota = rotas.find(r => r.id === itemValue);
              setRotaSelecionada(rota || null);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Selecione uma rota" value="" />
            {rotas.map(rota => (
              <Picker.Item 
                key={rota.id} 
                label={`${rota.origem} - ${rota.destino}`} 
                value={rota.id} 
              />
            ))}
          </Picker>

          <Text style={styles.label}>Horário:</Text>
          <Picker
            selectedValue={horario}
            onValueChange={(itemValue) => setHorario(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um horário" value="" />
            <Picker.Item label="Manhã" value="Manhã" />
            <Picker.Item label="Tarde" value="Tarde" />
            <Picker.Item label="Noite" value="Noite" />
          </Picker>

          <TouchableOpacity
            style={[styles.botao, (!rotaSelecionada || !horario || loading) && styles.botaoDisabled]}
            onPress={criarViagem}
            disabled={!rotaSelecionada || !horario || loading}
          >
            <Text style={styles.textoBotao}>
              {loading ? 'Salvando...' : 'Confirmar Viagem'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {viagensDoDia.length > 0 && (
        <View style={styles.listaWrapper}>
          <FlatList
            data={viagensDoDia}
            keyExtractor={(item) => item.id!}
            style={styles.listaContainer}
            contentContainerStyle={styles.listaContent}
            ListHeaderComponent={
              <Text style={styles.tituloLista}>Viagens em {selectedDate}:</Text>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemLista}
                activeOpacity={0.7}
                onPress={() => router.push(`/viagem/${item.id}`)}
                delayPressIn={100}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.textoItem}>
                    <Text style={textStyles.bold}>Rota: </Text>
                    {item.rotaData ? `${item.rotaData.origem} - ${item.rotaData.destino}` : 'Carregando...'}
                  </Text>
                  <Text style={styles.textoItem}>
                    <Text style={textStyles.bold}>Motorista: </Text>
                    {item.motoristaData?.name || 'Carregando...'}
                  </Text>
                  <Text style={styles.textoItem}>
                    <Text style={textStyles.bold}>Horário: </Text>
                    {item.horario || 'Não especificado'}
                  </Text>
                  <Text style={[styles.textoItem, { marginBottom: 0 }]}>
                    <Text style={textStyles.bold}>Status: </Text>
                    {item.status || 'Aberto'}
                  </Text>
                </View>

                <View style={styles.botoesContainer}>
                  <BotaoViagem 
                    tipo="editar" 
                    tamanho={40} 
                    onPress={() => iniciarEdicao(item)} 
                    disabled={loading}
                  />
                  <BotaoViagem 
                    tipo="excluir" 
                    tamanho={40}
                    onPress={() => {
                      setViagemParaExcluir(item);
                      setModalVisivel(true);
                    }}
                    disabled={loading}
                  />
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      )}

      <ModalConfirmacao
        visivel={modalVisivel}
        onCancelar={() => setModalVisivel(false)}
        onConfirmar={confirmarExclusao}
        mensagem="Deseja mesmo excluir essa viagem?"
        loading={loading}
      />

      {viagemParaEditar && (
        <ModalEdicao
          visivel={modalEdicaoVisivel}
          viagemInicial={{
            rota: viagemParaEditar.rota as Rota,
            horario: viagemParaEditar.horario,
            status: viagemParaEditar.status
          }}
          rotas={rotas}
          onCancelar={() => setModalEdicaoVisivel(false)}
          onSalvar={confirmarEdicao}
          titulo="Editar Viagem"
        />
      )}
    </View>
  );
}

// Estilos (sem alterações, mantidos para completude)
export const textStyles = StyleSheet.create({
  normal: {
    color: COLORS.white,
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold' as const,
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayDark,
    padding: 16,
  },
  botao: {
    backgroundColor: COLORS.greenDark,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoDisabled: {
    backgroundColor: COLORS.grayLight,
    opacity: 0.6,
  },
  textoBotao: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 20,
    backgroundColor: COLORS.grayLight,
    padding: 15,
    borderRadius: 8,
  },
  titulo: {
    color: COLORS.white,
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  label: {
    color: COLORS.white,
    marginTop: 10,
  },
  picker: {
    backgroundColor: COLORS.white,
    marginVertical: 10,
  },
  tituloLista: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  botoesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  textoItem: {
    color: COLORS.white,
    fontSize: 14,
    marginBottom: 4,
  },
  carregando: {
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 20,
  },

  listaWrapper: {
    flex: 1,
    width: '100%',
    marginTop: 10,
  },
  listaContainer: {
    width: '100%',
  },
  listaContent: {
    paddingBottom: 30,
  },
  itemLista: {
    backgroundColor: COLORS.blueDark,
    padding: 16,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
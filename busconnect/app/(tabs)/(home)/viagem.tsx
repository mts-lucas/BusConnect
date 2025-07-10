import { Alert, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CalendarViagem from '../../../components/Viagem/CalendarViagem';
import { BotaoViagem } from '../../../components/Viagem/BotaoViagem';
import { ModalConfirmacao } from '../../../components/Viagem/ModalConfirmacao';
import { ModalEdicao } from '../../../components/Viagem/ModalEdicao';
import { useRouter } from 'expo-router';
import { Viagem, Rota } from '../../../components/Viagem/types';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useAuth } from '../../../context/AuthContext';
import { DriverUserData } from '../../../components/profile/DriverProfileForm/types';

export default function ViagemScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  const [rotaSelecionada, setRotaSelecionada] = useState<Rota | null>(null);
  const [horario, setHorario] = useState('');
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [rotas, setRotas] = useState<Rota[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [viagemParaExcluir, setViagemParaExcluir] = useState<Viagem | null>(null);
  const [modalEdicaoVisivel, setModalEdicaoVisivel] = useState(false);
  const [viagemParaEditar, setViagemParaEditar] = useState<Viagem | null>(null);
  const [loading, setLoading] = useState(false);
  

  const router = useRouter();

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

  // Carrega viagens do Firestore
  const carregarViagens = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'viagens'), where('data', '==', selectedDate));
      const querySnapshot = await getDocs(q);
      const viagensData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Viagem[];
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

const { user } = useAuth();

const criarViagem = async () => {
  if (!rotaSelecionada || !user) return;

  try {
    setLoading(true);
    
    // Busca os dados completos do motorista
    const motoristaDoc = await getDoc(doc(db, 'users', user.uid));
    if (!motoristaDoc.exists()) {
      throw new Error("Perfil do motorista não encontrado");
    }

    const motoristaData = motoristaDoc.data();
    const motorista: DriverUserData = {
      nome: motoristaData.name || user.displayName || 'Motorista',
      email: motoristaData.email || '',
      phone: motoristaData.phone,
      licenseNumber: motoristaData.licenseNumber,
      vehiclePlate: motoristaData.vehiclePlate,
      fotoUrl: motoristaData.fotoUrl || user.photoURL,
      createdAt: motoristaData.createdAt,
    };

    const novaViagem: Omit<Viagem, 'id'> = {
      data: selectedDate,
      rota: rotaSelecionada,
      horario,
      status: 'Aberto',
      motorista,
    };

    await addDoc(collection(db, 'viagens'), novaViagem);
    await carregarViagens();
    setShowForm(false);
    setRotaSelecionada(null);
    setHorario('');
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

  const iniciarEdicao = (viagem: Viagem) => {
    setViagemParaEditar(viagem);
    setModalEdicaoVisivel(true);
  };

  const confirmarEdicao = async (dadosEditados: { rota: Rota; horario: string; status: string }) => {
    if (viagemParaEditar?.id) {
      try {
        setLoading(true);
        await updateDoc(doc(db, 'viagens', viagemParaEditar.id), dadosEditados);
        await carregarViagens();
        setModalEdicaoVisivel(false);
        setViagemParaEditar(null);
      } catch (error) {
        console.error("Erro ao editar viagem:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const viagensDoDia = viagens.filter(v => v.data === selectedDate);

  return (
    <View style={styles.container}>
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

      {loading && viagensDoDia.length === 0 && (
        <Text style={styles.carregando}>Carregando viagens...</Text>
      )}

      {viagensDoDia.length > 0 && (
        <TouchableOpacity onPress={() => router.push("/visualizarViagem")}>
          <Text style={styles.tituloLista}>Viagens em {selectedDate}:</Text>
          {viagensDoDia.map((viagem) => (
            <View key={viagem.id} style={styles.itemLista}>
              <View style={{ flex: 1 }}>
                <Text style={styles.textoItem}>
                  <Text style={textStyles.bold}>Rota: </Text>
                  {viagem.rota ? `${viagem.rota.origem} - ${viagem.rota.destino}` : 'Não especificada'}
                </Text>
                <Text style={styles.textoItem}>
                  <Text style={textStyles.bold}>Horário: </Text>
                  {viagem.horario || 'Não especificado'}
                </Text>
                <Text style={[styles.textoItem, { marginBottom: 0 }]}>
                  <Text style={textStyles.bold}>Status: </Text>
                  {viagem.status || 'Aberto'}
                </Text>
              </View>

              <View style={styles.botoesContainer}>
                <BotaoViagem 
                  tipo="editar" 
                  tamanho={40} 
                  onPress={() => iniciarEdicao(viagem)} 
                  disabled={loading}
                />
                <BotaoViagem 
                  tipo="excluir" 
                  tamanho={40}
                  onPress={() => {
                    setViagemParaExcluir(viagem);
                    setModalVisivel(true);
                  }}
                  disabled={loading}
                />
              </View>
            </View>
          ))}
        </TouchableOpacity>
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
            rota: viagemParaEditar.rota,
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

// Estilos
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
  itemLista: {
    backgroundColor: COLORS.blueDark,
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
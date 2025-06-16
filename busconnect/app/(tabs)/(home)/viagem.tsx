import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CalendarViagem from '../../../components/Viagem/CalendarViagem';
import { BotaoViagem } from '../../../components/Viagem/BotaoViagem';
import { ModalConfirmacao } from '../../../components/Viagem/ModalConfirmacao';
import { ModalEdicao } from '../../../components/Viagem/ModalEdicao';
import { useRouter } from 'expo-router';
import { Viagem } from '../../../components/Viagem/types';

export default function ViagemScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  const [rota, setRota] = useState('');
  const [horario, setHorario] = useState('');
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [viagemParaExcluir, setViagemParaExcluir] = useState<Viagem | null>(null);
  const [modalEdicaoVisivel, setModalEdicaoVisivel] = useState(false);
  const [viagemParaEditar, setViagemParaEditar] = useState<Viagem | null>(null);

  const router = useRouter();

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setShowForm(false);
  };

  const criarViagem = () => {
    const novaViagem: Viagem = {
      data: selectedDate,
      rota,
      horario,
      status: 'Aberto'
    };
    setViagens([...viagens, novaViagem]);
    setShowForm(false);
    setRota('');
    setHorario('');
  };

  const confirmarExclusao = () => {
    if (viagemParaExcluir) {
      setViagens(viagens.filter(v => v !== viagemParaExcluir));
      setModalVisivel(false);
      setViagemParaExcluir(null);
    }
  };

  const iniciarEdicao = (viagem: Viagem) => {
    setViagemParaEditar(viagem);
    setModalEdicaoVisivel(true);
  };

  const confirmarEdicao = (dadosEditados: { rota: string; horario: string; status: string }) => {
    if (viagemParaEditar) {
      const viagensAtualizadas = viagens.map(v =>
        v === viagemParaEditar ? { ...v, ...dadosEditados } : v
      );
      setViagens(viagensAtualizadas);
      setModalEdicaoVisivel(false);
      setViagemParaEditar(null);
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
        >
          <Text style={styles.textoBotao}>Criar Viagem</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.titulo}>Nova Viagem: {selectedDate}</Text>

          <Text style={styles.label}>Rota:</Text>
          <Picker
            selectedValue={rota}
            onValueChange={(itemValue) => setRota(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione uma rota" value="" />
            <Picker.Item label="Jucurutu - Caicó" value="Jucurutu - Caicó" />
            <Picker.Item label="Jucurutu - Assu" value="Jucurutu - Assu" />
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
            style={styles.botao}
            onPress={criarViagem}
            disabled={!rota || !horario}
          >
            <Text style={styles.textoBotao}>Confirmar Viagem</Text>
          </TouchableOpacity>
        </View>
      )}

      {viagensDoDia.length > 0 && (
        <TouchableOpacity onPress={()=>router.push("/visualizarViagem")}>
          <Text style={styles.tituloLista}>Viagens em {selectedDate}:</Text>
          {viagensDoDia.map((viagem, index) => (
            <View key={index} style={styles.itemLista}>
              <View style={{ flex: 1 }}>
                <Text style={styles.textoItem}>
                  <Text style={textStyles.bold}>Rota: </Text>
                  {viagem.rota || 'Não especificada'}
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
                />
                <BotaoViagem 
                  tipo="excluir" 
                  tamanho={40}
                  onPress={() => {
                    setViagemParaExcluir(viagem);
                    setModalVisivel(true);
                  }}
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
      />

      {viagemParaEditar && (
        <ModalEdicao
          visivel={modalEdicaoVisivel}
          viagemInicial={{
            rota: viagemParaEditar.rota,
            horario: viagemParaEditar.horario,
            status: viagemParaEditar.status
          }}
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
    paddingLeft: 0,
    marginLeft: 0,
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
    position: 'relative',
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
});

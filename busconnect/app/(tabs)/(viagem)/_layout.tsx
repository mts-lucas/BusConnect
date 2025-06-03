
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CalendarViagem from '../../../components/Viagem/CalendarViagem';
import { COLORS } from '../../../constants/colors';
import { styles, textStyles } from './styles'; // Importa os styles de ()
import { BotaoViagem } from '../../../components/Viagem/BotaoViagem';

type Viagem = {
  data: string;
  rota: string;
  horario: string;
  status: string;
};

export default function ViagemScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  const [rota, setRota] = useState('');
  const [horario, setHorario] = useState('');
  const [viagens, setViagens] = useState<Viagem[]>([]);

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
        <>
          <Text style={styles.tituloLista}>Viagens em {selectedDate}:</Text>
          {viagensDoDia.map((viagem, index) => (
            <View key={index} style={styles.itemLista}>
              <View style={styles.botoesContainer}>
                <BotaoViagem tipo="editar" tamanho={24} />
                <BotaoViagem tipo="excluir" tamanho={24} />
              </View>

             
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
          ))}
        </>
      )}
    </View>
  );
}
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';
import CalendarViagem from '../../../components/Viagem/CalendarViagem';
import { viagensMock } from '../../../mocks/presenca';
import { ViagemPresenca } from '../../../components/Viagem/types';
import { ViagensList } from '../../../components/Viagem/ViagensList';
import { ConfirmarPresencaModal } from '../../../components/Viagem/ConfirmarPresencaModal';

export default function ConfirmarPresencaScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedViagem, setSelectedViagem] = useState<ViagemPresenca | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [horarioSaida, setHorarioSaida] = useState('');
  const [viagens, setViagens] = useState<ViagemPresenca[]>(viagensMock);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const handleViagemPress = (viagem: ViagemPresenca) => {
    setSelectedViagem(viagem);
    setModalVisible(true);
    setHorarioSaida(viagem.presenca?.horarioSaida || '');
  };

  const confirmarPresenca = () => {
    if (!selectedViagem) return;

    const updatedViagens = viagens.map(v => {
      if (v.id === selectedViagem.id) {
        return {
          ...v,
          presenca: {
            ida: true,
            volta: false,
            horarioSaida: horarioSaida
          }
        };
      }
      return v;
    });

    setViagens(updatedViagens);
    setModalVisible(false);
  };

  const cancelarPresenca = () => {
    if (!selectedViagem) return;

    const updatedViagens = viagens.map(v => {
      if (v.id === selectedViagem.id) {
        const newViagem = { ...v };
        delete newViagem.presenca;
        return newViagem;
      }
      return v;
    });

    setViagens(updatedViagens);
    setModalVisible(false);
  };

  const viagensDoDia = viagens.filter(v => v.data === selectedDate);

  return (
    <View style={styles.container}>
      <CalendarViagem
        onDayPress={handleDayPress}
        markedDates={{
          ...viagens.reduce((acc, viagem) => ({
            ...acc,
            [viagem.data]: { 
              marked: true, 
              dotColor: viagem.presenca ? COLORS.greenDark : COLORS.yellowLight 
            }
          }), {}),
          [selectedDate]: {
            selected: true,
            selectedColor: COLORS.yellowDark,
            selectedTextColor: COLORS.grayDark,
          }
        }}
      />

      <ViagensList 
        viagens={viagensDoDia} 
        selectedDate={selectedDate} 
        onViagemPress={handleViagemPress} 
      />

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
});
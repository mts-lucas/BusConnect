import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Platform, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import { ConfirmarPresencaModalProps } from './types';
import Checkbox from 'expo-checkbox';

export const ConfirmarPresencaModal: React.FC<ConfirmarPresencaModalProps> = ({
  visible,
  onClose,
  viagem,
  horarioSaida,
  setHorarioSaida,
  onConfirm,
  onCancelPresenca,
}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [idaChecked, setIdaChecked] = useState(false);
  const [voltaChecked, setVoltaChecked] = useState(false);

  useEffect(() => {
    if (viagem?.presenca) {
      setIdaChecked(viagem.presenca.ida);
      setVoltaChecked(viagem.presenca.volta);
    } else {
      setIdaChecked(false);
      setVoltaChecked(false);
    }
  }, [viagem]);

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      setHorarioSaida(`${hours}:${minutes}`);
    }
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const isButtonDisabled = () => {
    if (!idaChecked && !voltaChecked) return true; 
    if (voltaChecked && !horarioSaida) return true; 
    return false;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitulo}>
            {viagem?.presenca ? 'Alterar Presença' : 'Confirmar Presença'}
          </Text>
          
          {viagem && (
            <>
              <Text style={styles.modalTexto}>
                {viagem.rota.origem} - {viagem.rota.destino} ({viagem.turno})
              </Text>

              <View style={styles.checkboxContainer}>
                <View style={styles.checkboxRow}>
                  <Checkbox
                    value={idaChecked}
                    onValueChange={(value) => {
                      setIdaChecked(value);
                      if (!value && !voltaChecked) {
                        setHorarioSaida('');
                      }
                    }}
                    color={idaChecked ? '#4CAF50' : undefined} 
                  />
                  <Text style={styles.checkboxLabel}>Ida</Text>
                </View>

                <View style={[styles.checkboxRow, { marginLeft: 20 }]}>
                  <Checkbox
                    value={voltaChecked}
                    onValueChange={(value) => {
                      setVoltaChecked(value);
                      if (!value) {
                        setHorarioSaida('');
                      }
                    }}
                    color={voltaChecked ? '#4CAF50' : undefined} 
                  />
                  <Text style={styles.checkboxLabel}>Volta</Text>
                </View>
              </View>

              {voltaChecked && (
                <>
                  <Text style={styles.label}>Horário de Saída:</Text>
                  <TouchableWithoutFeedback onPress={showTimePickerModal}>
                    <View>
                      <TextInput
                        style={styles.input}
                        placeholder="HH:MM"
                        value={horarioSaida}
                        onChangeText={setHorarioSaida}
                        editable={false}
                        onTouchStart={showTimePickerModal}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </>
              )}

              {showTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  is24Hour={true}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleTimeChange}
                />
              )}

              <View style={styles.botoesContainer}>
                <TouchableOpacity
                  style={[styles.botao, styles.botaoCancelar]}
                  onPress={() => {
                    if (viagem.presenca) {
                      onCancelPresenca();
                    } else {
                      onClose();
                    }
                  }}
                >
                  <Text style={styles.textoBotao}>
                    {viagem.presenca ? 'Cancelar Presença' : 'Voltar'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.botao, 
                    styles.botaoConfirmar, 
                    isButtonDisabled() && styles.botaoDisabled
                  ]}
                  onPress={() => onConfirm({ ida: idaChecked, volta: voltaChecked })}
                  disabled={isButtonDisabled()}
                >
                  <Text style={styles.textoBotao}>
                    {viagem.presenca ? 'Atualizar' : 'Confirmar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};
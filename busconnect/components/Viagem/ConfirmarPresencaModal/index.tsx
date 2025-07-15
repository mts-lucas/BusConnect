import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Platform, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
import { ConfirmarPresencaModalProps } from './types';
import Checkbox from 'expo-checkbox';
import { COLORS } from '../../../constants/colors';

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
    if (viagem?.minhaPresenca) {
      setIdaChecked(viagem.minhaPresenca.ida);
      setVoltaChecked(viagem.minhaPresenca.volta);
      setHorarioSaida(viagem.minhaPresenca.horarioSaida || '');
    } else {
      setIdaChecked(false);
      setVoltaChecked(false);
      setHorarioSaida('');
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
            {viagem?.minhaPresenca ? 'Alterar Presença' : 'Confirmar Presença'}
          </Text>
          
          {viagem && (
            <>
              <Text style={styles.modalTexto}>
                {viagem.rotaData?.origem} - {viagem.rotaData?.destino} ({viagem.horario})
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
                    color={idaChecked ? COLORS.greenDark : undefined}
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
                    color={voltaChecked ? COLORS.greenDark : undefined}
                  />
                  <Text style={styles.checkboxLabel}>Volta</Text>
                </View>
              </View>

              {/* Campo de Horário de Saída, visível apenas se "Volta" estiver marcada */}
              {voltaChecked && (
                <>
                  <Text style={styles.label}>Horário de Saída:</Text>
                  
                  {/* Lógica condicional para Web vs. Mobile */}
                  {Platform.OS === 'web' ? (
                    // Para Web: TextInput editável
                    <TextInput
                      style={styles.input}
                      placeholder="HH:MM"
                      placeholderTextColor={COLORS.grayLight}
                      value={horarioSaida}
                      onChangeText={(text) => {
                        // Opcional: Adicionar validação de formato HH:MM aqui
                        // Ex: Regex para garantir que o formato é válido
                        const formattedText = text.replace(/[^0-9:]/g, ''); // Permite apenas números e ':'
                        if (formattedText.length <= 5) { // Para não permitir mais que HH:MM
                          setHorarioSaida(formattedText);
                        }
                      }}
                      keyboardType="numbers-and-punctuation" // Sugere teclado numérico para mobile, mas pode não ter efeito em web
                      maxLength={5} // HH:MM (5 caracteres)
                    />
                  ) : (
                    // Para Mobile (iOS/Android): TextInput que abre o DateTimePicker
                    <TouchableWithoutFeedback onPress={showTimePickerModal}>
                      <View>
                        <TextInput
                          style={styles.input}
                          placeholder="HH:MM"
                          placeholderTextColor={COLORS.grayLight}
                          value={horarioSaida}
                          onChangeText={setHorarioSaida} // Embora seja 'editable=false', é bom ter
                          editable={false} // Impede edição direta, força uso do picker
                          onTouchStart={showTimePickerModal} // Abre o picker ao tocar
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                </>
              )}

              {/* Picker de Horário (para Android/iOS), visível apenas em mobile e quando showTimePicker é true */}
              {Platform.OS !== 'web' && showTimePicker && (
                <DateTimePicker
                  value={new Date()} // Pode inicializar com o horário atual ou com horarioSaida se for alterar
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
                    if (viagem.minhaPresenca) {
                      onCancelPresenca();
                    } else {
                      onClose();
                    }
                  }}
                >
                  <Text style={styles.textoBotao}>
                    {viagem.minhaPresenca ? 'Cancelar Presença' : 'Voltar'}
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
                    {viagem.minhaPresenca ? 'Atualizar' : 'Confirmar'}
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
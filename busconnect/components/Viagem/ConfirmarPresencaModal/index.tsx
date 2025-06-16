import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { styles } from './styles';
import { ConfirmarPresencaModalProps } from './types';

export const ConfirmarPresencaModal: React.FC<ConfirmarPresencaModalProps> = ({
  visible,
  onClose,
  viagem,
  horarioSaida,
  setHorarioSaida,
  onConfirm,
  onCancelPresenca,
}) => {
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
              
              <Text style={styles.label}>Horário de Saída:</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                value={horarioSaida}
                onChangeText={setHorarioSaida}
              />

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
                  style={[styles.botao, styles.botaoConfirmar]}
                  onPress={onConfirm}
                  disabled={!horarioSaida}
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
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS } from '../../../constants/colors';
import { useState, useEffect } from 'react';
import { styles } from './styles';

type ModalEdicaoProps = {
  visivel: boolean;
  viagemInicial: {
    rota: string;
    horario: string;
    status: string;
  };
  onCancelar: () => void;
  onSalvar: (dados: { rota: string; horario: string; status: string }) => void;
  titulo?: string;
};

export function ModalEdicao({
  visivel,
  viagemInicial,
  onCancelar,
  onSalvar,
  titulo = 'Editar Viagem',
}: ModalEdicaoProps) {
  const [rota, setRota] = useState(viagemInicial.rota);
  const [horario, setHorario] = useState(viagemInicial.horario);
  const [status, setStatus] = useState(viagemInicial.status);

  useEffect(() => {
    setRota(viagemInicial.rota);
    setHorario(viagemInicial.horario);
    setStatus(viagemInicial.status);
  }, [viagemInicial]);

  const handleSalvar = () => {
    if (!rota || !horario) {
      return; // Validação básica
    }
    onSalvar({ rota, horario, status });
  };

  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={onCancelar}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitulo}>{titulo}</Text>

          <Text style={styles.label}>Rota:</Text>
          <TextInput
            style={styles.input}
            value={rota}
            onChangeText={setRota}
            placeholder="Digite a rota..."
            placeholderTextColor={COLORS.grayLight}
          />

          <Text style={styles.label}>Horário:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={horario}
              onValueChange={setHorario}
              style={styles.picker}
              dropdownIconColor={COLORS.grayDark}
            >
              <Picker.Item label="Selecione um horário" value="" />
              <Picker.Item label="Manhã" value="Manhã" />
              <Picker.Item label="Tarde" value="Tarde" />
              <Picker.Item label="Noite" value="Noite" />
            </Picker>
          </View>

          <Text style={styles.label}>Status:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={setStatus}
              style={styles.picker}
              dropdownIconColor={COLORS.grayDark}
            >
              <Picker.Item label="Aberto" value="Aberto" />
              <Picker.Item label="Fechado" value="Fechado" />
            </Picker>
          </View>

          <View style={styles.modalBotoesContainer}>
            <TouchableOpacity
              style={[styles.botaoModal, styles.botaoCancelar]}
              onPress={onCancelar}
            >
              <Text style={styles.textoBotaoModal}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botaoModal, styles.botaoSalvar, (!rota || !horario) && styles.botaoDesabilitado]}
              onPress={handleSalvar}
              disabled={!rota || !horario}
            >
              <Text style={styles.textoBotaoModal}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
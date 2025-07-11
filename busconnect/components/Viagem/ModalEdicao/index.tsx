import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS } from '../../../constants/colors';
import { useState, useEffect } from 'react';
import { styles } from './styles';
import { Rota } from '../../../components/Viagem/types';

type ModalEdicaoProps = {
  visivel: boolean;
  viagemInicial: {
    rota: Rota;
    horario: string;
    status: string;
  };
  rotas: Rota[];
  onCancelar: () => void;
  onSalvar: (dados: { rota: Rota; horario: string; status: string }) => void;
  titulo?: string;
};

export function ModalEdicao({
  visivel,
  viagemInicial,
  rotas,
  onCancelar,
  onSalvar,
  titulo = 'Editar Viagem',
}: ModalEdicaoProps) {
  const [rota, setRota] = useState<Rota>(viagemInicial.rota);
  const [horario, setHorario] = useState(viagemInicial.horario);
  const [status, setStatus] = useState(viagemInicial.status);

  useEffect(() => {
    setRota(viagemInicial.rota);
    setHorario(viagemInicial.horario);
    setStatus(viagemInicial.status);
  }, [viagemInicial]);

  const handleSalvar = () => {
    if (!rota || !horario) {
      return;
    }
    onSalvar({ rota, horario, status });
  };

  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={onCancelar}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitulo}>{titulo}</Text>

          <Text style={styles.label}>Rota:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={rota.id}
              onValueChange={(itemValue) => {
                const rotaSelecionada = rotas.find(r => r.id === itemValue);
                if (rotaSelecionada) setRota(rotaSelecionada);
              }}
              style={styles.picker}
              dropdownIconColor={COLORS.grayDark}
            >
              {rotas.map(rota => (
                <Picker.Item 
                  key={rota.id} 
                  label={`${rota.origem} - ${rota.destino}`} 
                  value={rota.id} 
                />
              ))}
            </Picker>
          </View>

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
              <Picker.Item label="Confirmado" value="Confirmado" />
              <Picker.Item label="Cancelado" value="Cancelado" />
              <Picker.Item label="Finalizado" value="Finalizado" />
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
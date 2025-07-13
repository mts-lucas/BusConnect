import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export interface ModalConfirmacaoProps {
  visivel: boolean;
  onCancelar: () => void;
  onConfirmar: () => void;
  mensagem: string;
  loading?: boolean;
}

export function ModalConfirmacao({
  visivel,
  onCancelar,
  onConfirmar,
  mensagem = 'Tem certeza que deseja continuar?',
}: ModalConfirmacaoProps) {
  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTexto}>{mensagem}</Text>
          <View style={styles.modalBotoesContainer}>
            <TouchableOpacity
              style={[styles.botaoModal, styles.botaoCancelar]}
              onPress={onCancelar}
            >
              <Text style={styles.textoBotaoModal}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botaoModal, styles.botaoConfirmar]}
              onPress={onConfirmar}
            >
              <Text style={styles.textoBotaoModal}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
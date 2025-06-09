import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from './../../constants/colors';

type ModalConfirmacaoProps = {
  visivel: boolean;
  onCancelar: () => void;
  onConfirmar: () => void;
  mensagem?: string;
};

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

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.grayLight,
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTexto: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.white,
  },
  modalBotoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  botaoModal: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: COLORS.redDark,
  },
  botaoConfirmar: {
    backgroundColor: COLORS.blueDark,
  },
  textoBotaoModal: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

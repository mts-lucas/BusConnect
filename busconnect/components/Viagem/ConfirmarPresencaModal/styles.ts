import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.grayLight,
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitulo: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTexto: {
    color: COLORS.white,
    marginBottom: 20,
  },
  label: {
    color: COLORS.white,
    marginBottom: 5,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botao: {
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: COLORS.red,
  },
  botaoConfirmar: {
    backgroundColor: COLORS.greenDark,
  },
  textoBotao: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
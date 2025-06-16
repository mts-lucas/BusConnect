import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
  itemLista: {
    backgroundColor: COLORS.blueDark,
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemConfirmado: {
    backgroundColor: COLORS.greenDark,
  },
  infoContainer: {
    flex: 1,
  },
  textoItem: {
    color: COLORS.white,
    fontSize: 14,
    marginBottom: 4,
  },
  textoNegrito: {
    fontWeight: 'bold',
  },
});
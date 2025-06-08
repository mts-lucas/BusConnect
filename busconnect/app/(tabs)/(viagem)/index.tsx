import { Calendar } from 'react-native-calendars';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

// 1. Primeiro definimos e exportamos os estilos
export const textStyles = StyleSheet.create({
  normal: {
    color: COLORS.white,
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold' as const,
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayDark,
    padding: 16,
  },
  botao: {
    backgroundColor: COLORS.greenDark,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 20,
    backgroundColor: COLORS.grayLight,
    padding: 15,
    borderRadius: 8,
  },
  titulo: {
    color: COLORS.white,
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  label: {
    color: COLORS.white,
    marginTop: 10,
  },
  picker: {
    backgroundColor: COLORS.white,
    marginVertical: 10,
  },
  tituloLista: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    paddingLeft: 0,
    marginLeft: 0,
  },
  itemLista: {
    backgroundColor: COLORS.blueDark,
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  botoesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  textoItem: {
    color: COLORS.white,
    fontSize: 14,
    marginBottom: 4,
  },
});

// 2. Depois exportamos o componente principal
export default function CalendarViagemScreen() {
  return (
    <View style={styles.container}>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        theme={{
          calendarBackground: COLORS.grayDark,
          dayTextColor: COLORS.white,
          monthTextColor: COLORS.yellowLight,
        }}
      />
    </View>
  );
}
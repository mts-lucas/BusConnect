// app/(tabs)/(viagem)/styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const textStyles = StyleSheet.create({
  normal: {
    color: COLORS.white,
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold' as const, // Tipo específico para fontWeight
  },
});
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayDark,
    padding: 16,
  },
  botao: {
    backgroundColor: COLORS.yellowLight,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: COLORS.grayDark,
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
    paddingLeft: 0,  // Garante que o título comece no canto
    marginLeft: 0,   // Remove qualquer margem automática
  },
  itemLista: {
    backgroundColor: COLORS.blueDark,
    paddingVertical: 12,
    paddingHorizontal: 16,  // Mantém um padding interno apenas
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    marginLeft: 0,   // Remove margens laterais
    paddingLeft: 0,  // Remove padding interno à esquerda
  },
  textoItem: {
    color: COLORS.white,
    fontSize: 14,
    marginBottom: 4,
    paddingLeft: 0,  // Textos grudados no canto esquerdo
    marginLeft: 0,   // Remove margem automática
  },
  
});

import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.white,
  },
  button: {
    height: 50,
    backgroundColor: COLORS.purpleLight,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
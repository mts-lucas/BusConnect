import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.yellowLight,
  },
  changePhotoButton: {
    marginTop: 8,
  },
  changePhotoText: {
    color: COLORS.yellowLight,
    fontWeight: 'bold',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    color: COLORS.white,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    color: COLORS.black,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    backgroundColor: COLORS.white,
    color: COLORS.black,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 40, // Espaço extra para o bottom tab
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: COLORS.grayLight,
  },
  buttonEnabled: {
    backgroundColor: COLORS.yellowLight,
  },
    creationInfoContainer: {
  marginTop: 20,
  paddingVertical: 10,
  borderTopColor: '#e0e0e0',
  alignItems: 'center',
},
creationInfoText: {
  fontSize: 14,
  color: '#666',
},
});
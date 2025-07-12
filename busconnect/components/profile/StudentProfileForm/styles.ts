// busconnect/components/profile/StudentProfileForm/styles.ts
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.grayDark,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.yellowDark,
  },
  changePhotoButton: {
    marginTop: 10,
    backgroundColor: COLORS.yellowDark,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  changePhotoText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.white,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.grayDark,
  },
  pickerContainer: {
    backgroundColor: COLORS.grayLight,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: COLORS.grayDark,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: COLORS.yellowDark,
  },
  buttonDisabled: {
    backgroundColor: COLORS.grayLight,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  creationInfoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  creationInfoText: {
    color: COLORS.white,
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export const modalStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    maxWidth: '80%',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.grayDark,
  },
  button: {
    backgroundColor: COLORS.yellowDark,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
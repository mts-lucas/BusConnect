import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.yellowDark,
    borderRadius: 12,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  icon: {
    color: COLORS.white,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.grayDark,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.white,
  },
});
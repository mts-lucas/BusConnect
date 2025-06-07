import { Calendar } from 'react-native-calendars';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export default function ViagemScreen() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayDark,
    padding: 16,
  },
});
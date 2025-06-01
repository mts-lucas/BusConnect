// components/CalendarViagem/index.tsx
import { Calendar, CalendarProps, DateData } from 'react-native-calendars'; // Adicione DateData no import
import { COLORS } from '../../constants/colors';

type Props = CalendarProps & {
  onDayPress?: (date: DateData) => void;
  markedDates?: Record<string, any>;
};

export default function CalendarViagem({ 
  onDayPress = () => {}, 
  markedDates = {},
  ...props
}: Props) {
  return (
    <Calendar
      current={new Date().toISOString().split('T')[0]}
      onDayPress={(day) => onDayPress(day)}
      markedDates={markedDates}
      theme={{
        calendarBackground: COLORS.grayDark,
        dayTextColor: COLORS.white,
        monthTextColor: COLORS.yellowLight,
        arrowColor: COLORS.yellowLight,
        selectedDayBackgroundColor: COLORS.yellowDark,
      }}
      {...props}
    />
  );
}
import { Calendar, CalendarProps, DateData } from 'react-native-calendars';
import { COLORS } from "../../../constants/colors";

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
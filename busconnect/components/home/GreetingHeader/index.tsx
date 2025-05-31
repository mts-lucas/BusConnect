import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { styles } from './styles';

interface GreetingHeaderProps {
  text: string;
  style?: StyleProp<TextStyle>;
}

export const GreetingHeader: React.FC<GreetingHeaderProps> = ({ text, style }) => {
  return (
    <Text style={[styles.text, style]}>
      {text}
    </Text>
  );
};
import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { styles } from './styles';

interface LogoProps {
  style?: StyleProp<ViewStyle>;
}

export const Logo: React.FC<LogoProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>MyApp</Text>
    </View>
  );
};
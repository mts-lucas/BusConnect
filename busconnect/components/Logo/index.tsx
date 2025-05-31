import React from 'react';
import { View, StyleProp, ViewStyle, Image} from 'react-native';
import { styles } from './styles';

interface LogoProps {
  style?: StyleProp<ViewStyle>;
}

export const Logo: React.FC<LogoProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('../../assets/images/buslogo.png')}
        style={[styles.image, { height: 300, width: 300 }]}
        resizeMode="contain"
      />
    </View>
  );
};
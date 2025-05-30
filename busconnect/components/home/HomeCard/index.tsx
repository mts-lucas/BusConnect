import React from 'react';
import { TouchableOpacity, Text, View, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { HomeCardProps } from './types';

export const HomeCard: React.FC<HomeCardProps> = ({ 
  title, 
  description, 
  onPress,
  iconName
}) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Ionicons name={iconName} size={24} color={styles.icon.color} style={styles.icon} />
        
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
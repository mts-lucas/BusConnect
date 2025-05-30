import { Ionicons } from '@expo/vector-icons';

export interface HomeCardProps {
  title: string;
  description: string;
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
}
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LoginFormProps, LoginFormValues } from './types';
import { COLORS } from '../../constants/colors';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof LoginFormValues, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!values.email || !values.password) {
      return;
    }
    onSubmit(values.email, values.password);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor={COLORS.white}
        autoCapitalize="none"
        value={values.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Senha"
          placeholderTextColor={COLORS.white}
          secureTextEntry={!showPassword}
          value={values.password}
          onChangeText={(text) => handleChange('password', text)}
        />
        <TouchableOpacity 
          style={styles.eyeIcon} 
          onPress={toggleShowPassword}
        >
          <Ionicons 
            name={showPassword ? 'eye-off' : 'eye'} 
            size={24} 
            color={COLORS.white} 
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.button,
          (!values.email || !values.password) && styles.buttonDisabled
        ]} 
        onPress={handleSubmit}
        disabled={loading || !values.email || !values.password}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Carregando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
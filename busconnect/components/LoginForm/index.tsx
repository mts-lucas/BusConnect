import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LoginFormProps, LoginFormValues } from './types';
import { COLORS } from '../../constants/colors';
import { styles } from './styles';

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });

  const handleChange = (field: keyof LoginFormValues, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!values.email || !values.password) {
      return;
    }
    onSubmit(values.email, values.password);
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
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={COLORS.white}
        secureTextEntry
        value={values.password}
        onChangeText={(text) => handleChange('password', text)}
      />
      
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
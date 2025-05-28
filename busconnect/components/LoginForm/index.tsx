import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { styles } from './styles';
import { LoginFormProps, LoginFormValues } from './types';

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });

  const handleChange = (field: keyof LoginFormValues, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={values.password}
        onChangeText={(text) => handleChange('password', text)}
      />
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Carregando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
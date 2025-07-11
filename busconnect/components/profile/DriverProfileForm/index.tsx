import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';
import { DriverUserData, DriverProfileFormProps } from './types';
import { Timestamp } from 'firebase/firestore';

export const DriverProfileForm: React.FC<DriverProfileFormProps> = ({ 
  initialData,
}) => {
  const [driverUserData, setDriverUserData] = useState<DriverUserData>(initialData);
  const [originalData] = useState<DriverUserData>(initialData);
  const [avatar, setAvatar] = useState(initialData.fotoUrl);
  const { createdAt } = initialData;

  const handleChange = (field: keyof DriverUserData, value: string) => {
    setDriverUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdatePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const hasChanges =
    JSON.stringify(driverUserData) !== JSON.stringify(originalData) ||
    avatar !== initialData.fotoUrl;

  const handleSubmit = () => {
    alert('Dados atualizados com sucesso!');
    setDriverUserData({ ...driverUserData });
  };

  const formatCreationDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'Data não disponível';
    
    const date = timestamp.toDate();
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.changePhotoButton} onPress={handleUpdatePhoto}>
          <Text style={styles.changePhotoText}>Alterar Foto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          keyboardType="email-address"
          value={driverUserData.email}
          onChangeText={(text) => handleChange('email', text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          keyboardType="phone-pad"
          value={driverUserData.phone}
          onChangeText={(text) => handleChange('phone', text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Número da CNH</Text>
        <TextInput
          style={[styles.input,]}
          placeholder="Número da CNH"
          value={driverUserData.licenseNumber}
          editable={false}
          selectTextOnFocus={false}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Placa do Veículo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a placa do veículo"
          value={driverUserData.vehiclePlate}
          onChangeText={(text) => handleChange('vehiclePlate', text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            hasChanges ? styles.buttonEnabled : styles.buttonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!hasChanges}
        >
          <Text style={styles.buttonText}>Atualizar Dados</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.creationInfoContainer}>
        <Text style={styles.creationInfoText}>
          Perfil criado em: {formatCreationDate(createdAt)}
        </Text>
      </View>
    </View>
  );
};
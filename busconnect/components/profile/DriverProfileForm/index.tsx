// busconnect/components/profile/DriverProfileForm/index.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { DriverUserData, DriverProfileFormProps } from './types';
import { Timestamp, getFirestore, doc, updateDoc } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';
import { styles, modalStyles } from './styles';

const db = getFirestore(app);

const CustomModalForm = ({ message, onClose }: { message: string | null; onClose: () => void }) => {
  if (!message) return null;

  return (
    <View style={modalStyles.overlay}>
      <View style={modalStyles.container}>
        <Text style={modalStyles.message}>{message}</Text>
        <TouchableOpacity onPress={onClose} style={modalStyles.button}>
          <Text style={modalStyles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const DriverProfileForm: React.FC<DriverProfileFormProps> = ({
  initialData,
  userUid,
}) => {
  const [driverUserData, setDriverUserData] = useState<DriverUserData>(initialData);
  const [originalData] = useState<DriverUserData>(initialData);
  const [avatar, setAvatar] = useState<string>(initialData.fotoUrl);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const { createdAt } = initialData;

  const handleChange = (field: keyof DriverUserData, value: string) => {
    setDriverUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdatePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

  const handleSubmit = async () => {
    if (!userUid) {
      setModalMessage("Erro: UID do usuário não disponível para atualização.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", userUid);
      const dataToUpdate = {
        name: driverUserData.name,
        email: driverUserData.email,
        phone: driverUserData.phone,
        vehiclePlate: driverUserData.vehiclePlate,
        fotoUrl: avatar,
      };

      await updateDoc(userDocRef, dataToUpdate);
      setModalMessage('Dados atualizados com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar dados do motorista:", error);
      setModalMessage("Erro ao atualizar dados. Tente novamente.");
    }
  };

  const formatCreationDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'Data não disponível';

    const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCloseModal = () => {
    setModalMessage(null);
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
        <Text style={styles.fieldLabel}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={driverUserData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
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
          style={[styles.input]}
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

      <CustomModalForm message={modalMessage} onClose={handleCloseModal} />
    </View>
  );
};
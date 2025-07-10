// busconnect/components/profile/StudentProfileForm/index.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { StudentUserData, StudentProfileFormProps } from './types';
import { Timestamp, getFirestore, doc, updateDoc } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';
import { styles, modalStyles } from './styles';

const db = getFirestore(app);

const CustomModalStudent = ({ message, onClose }: { message: string | null; onClose: () => void }) => {
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

export const StudentProfileForm: React.FC<StudentProfileFormProps> = ({ 
  initialData, 
  userUid 
}) => {
  const [studentUserData, setStudentUserData] = useState<StudentUserData>(initialData);
  const [originalData] = useState<StudentUserData>(initialData);
  const [avatar, setAvatar] = useState<string>(initialData.fotoUrl);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const pickerRef = useRef<Picker<string>>(null);

  const handleChange = (field: keyof StudentUserData, value: string) => {
    setStudentUserData(prev => ({ ...prev, [field]: value }));
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
    JSON.stringify(studentUserData) !== JSON.stringify(originalData) || 
    avatar !== initialData.fotoUrl;

  const handleSubmit = async () => {
    if (!userUid) {
      setModalMessage("Erro: UID do usuário não disponível para atualização.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", userUid);
      const dataToUpdate = {
        name: studentUserData.name,
        email: studentUserData.email,
        phone: studentUserData.phone,
        registration: studentUserData.registration,
        institution: studentUserData.institution,
        local: studentUserData.local,
        horarioAula: studentUserData.horarioAula,
        fotoUrl: avatar,
      };

      await updateDoc(userDocRef, dataToUpdate);
      setModalMessage('Dados atualizados com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar dados do estudante:", error);
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
          value={studentUserData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          keyboardType="email-address"
          value={studentUserData.email}
          onChangeText={(text) => handleChange('email', text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          keyboardType="phone-pad"
          value={studentUserData.phone}
          onChangeText={(text) => handleChange('phone', text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Matrícula</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua matrícula"
          value={studentUserData.registration}
          onChangeText={(text) => handleChange('registration', text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Instituição</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua instituição"
          value={studentUserData.institution}
          onChangeText={(text) => handleChange('institution', text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Localidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua localidade"
          value={studentUserData.local}
          onChangeText={(text) => handleChange('local', text)}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Horário de Aula</Text>
        <View style={styles.pickerContainer}>
          <Picker
            ref={pickerRef}
            style={styles.picker}
            selectedValue={studentUserData.horarioAula}
            onValueChange={(itemValue) => handleChange('horarioAula', itemValue)}
          >
            <Picker.Item label="Matutino" value="Matutino" />
            <Picker.Item label="Vespertino" value="Vespertino" />
            <Picker.Item label="Noturno" value="Noturno" />
            <Picker.Item label="Integral" value="Integral" />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            hasChanges ? styles.buttonEnabled : styles.buttonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!hasChanges}
        >
          <Text style={styles.buttonText}>Atualizar Dados</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.creationInfoContainer}>
        <Text style={styles.creationInfoText}>
          Perfil criado em: {formatCreationDate(initialData.createdAt)}
        </Text>
      </View>

      <CustomModalStudent message={modalMessage} onClose={handleCloseModal} />
    </View>
  );
};
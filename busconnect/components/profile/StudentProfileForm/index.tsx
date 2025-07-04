import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';
import { StudentUserData, StudentProfileFormProps } from './types';

export const StudentProfileForm: React.FC<StudentProfileFormProps> = ({ initialData }) => {
  const [studentUserData, setStudentUserData] = useState<StudentUserData>(initialData);
  const [originalData] = useState<StudentUserData>(initialData);
  const [avatar, setAvatar] = useState(initialData.fotoUrl);

  const pickerRef = useRef<Picker<string>>(null);

  const handleChange = (field: keyof StudentUserData, value: string) => {
    setStudentUserData(prev => ({ ...prev, [field]: value }));
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

  const hasChanges = JSON.stringify(studentUserData) !== JSON.stringify(originalData) || avatar !== initialData.fotoUrl;

  const handleSubmit = () => {
    alert('Dados atualizados com sucesso!');
    setStudentUserData({ ...studentUserData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: avatar }} 
          style={styles.avatar} 
        />
        <TouchableOpacity 
          style={styles.changePhotoButton}
          onPress={handleUpdatePhoto}
        >
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
          value={studentUserData.telefone}
          onChangeText={(text) => handleChange('telefone', text)}
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
          value={studentUserData.localidade}
          onChangeText={(text) => handleChange('localidade', text)}
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
    </View>
  );
};
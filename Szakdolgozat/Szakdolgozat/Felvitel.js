import React, { useState } from 'react';
import { Alert, Button, Image, View, Text, TextInput, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ipcim from './Ipcim';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ImagePickerExample() {
  const [bevitel2, setBevitel2] = useState('');
  const [image, setImage] = useState(null);
  const SERVER_URL = Ipcim.Ipcim;

  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
      name: 'photo.jpg',
      type: 'image/jpg',
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  const handleUploadPhoto = async () => {
    try {
      if (!image) {
        Alert.alert('Please select an image first');
        return;
      }

      const felhasznaloId = await AsyncStorage.getItem('felhasznaloId');

      const response = await fetch(`${SERVER_URL}/api/upload3`, {
        method: 'POST',
        body: createFormData(image, { bevitel2, felhasznaloId }),
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Network request failed');
      }

      const data = await response.json();
      console.log('response', data);
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{textAlign:"left", padding: 10 }}>
        Leírás:
      </Text>
      <TextInput
        multiline={true}
        numberOfLines={10}
        maxLength={492}
        style={{  height:199, width:350, textAlignVertical: 'top', margin: 5, backgroundColor: 'grey' }}
        placeholder="Leírás"
        onChangeText={newText => setBevitel2(newText)}
        defaultValue={bevitel2}
      />
      
      <Button title="Válassz fotót a galériából" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
      <Button title="Fotó feltöltése" onPress={handleUploadPhoto} />
    </View>
  );
}
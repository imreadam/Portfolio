import React, { useEffect, useState} from 'react';
import { Button, Image, View, Text, TextInput, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';
import Ipcim from './Ipcim';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [bevitel1, setBevitel1] = useState('');
  const [bevitel2, setBevitel2] = useState('');
  const [bevitel3, setBevitel3] = useState('');
  const [bevitel4, setBevitel4] = useState('');
  const SERVER_URL = Ipcim.Ipcim;
  const [data, setData] = useState([]);
  const [selectedTelepules, setSelectedTelepules] = useState();

  const getMovies = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim+'/lenyilolista');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);


  
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
        console.log('Please select an image first');
        return;
      }

      const response = await fetch(Ipcim.Ipcim+`/api/upload`, {
        method: 'POST',
        body: createFormData(image,{ bevitel1,bevitel2,bevitel3,bevitel4,selectedTelepules}),

        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Network request failed');
      }
      
      const data = await response.json();
        console.log('response', data);
        console.log('Sikeres regisztráció', response.data);
        Alert.alert('Sikeres regisztráció', '', [
          {
            text: 'OK',
            onPress: () => {
              setAuthenticated(false);
              navigation.navigate('Regisztracio');
            },
          },
        ]);
    
      
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    
    <Text style={{padding: 10}}>
      Név:
      </Text>
      <TextInput
        style={{height: 40,width:250, margin:5, backgroundColor:"cyan"}}
        onChangeText={newText => setBevitel1(newText)}
        defaultValue={bevitel1}
      />
      <Text style={{padding: 10}}>
      Email:
      </Text>
      <TextInput
        style={{height: 40,width:250, margin:5, backgroundColor:"cyan"}}
        onChangeText={newText => setBevitel2(newText)}
        defaultValue={bevitel2}
      />
      
      <Text style={{padding: 10}}>
      Telefonszám:
      </Text>
      <TextInput
        style={{height: 40,width:250, margin:5, backgroundColor:"cyan"}}
        onChangeText={newText => setBevitel3(newText)}
        defaultValue={bevitel3}
      />
      
      <Text style={{padding: 10}}>
      Cím:
      </Text>
      <TextInput
        style={{height: 40,width:250, margin:5, backgroundColor:"cyan"}}
        onChangeText={newText => setBevitel4(newText)}
        defaultValue={bevitel4}
      />

      <View >
      
      <Picker
        style={{width:200,height:20}}
        selectedValue={selectedTelepules}
        onValueChange={(itemValue,itemIndex) =>
        setSelectedTelepules(itemValue)
        
        
      }>
        {data.map((item)=>{
           return(
        
          <Picker.item label={item.telepules_nev} value={item.telepules_id}/>
          
        
         
	      )}
	      )}
      </Picker>
      </View>

      <Button title="Regisztrálok!" onPress={handleUploadPhoto} />
      <Button title="Kép kiválasztása" onPress={pickImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}

    </View>

    
  );
}
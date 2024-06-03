import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ipcim from './Ipcim';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import CheckBox from 'react-native-checkbox';

const SERVER_URL = Ipcim.Ipcim;

const LoginScreen = ({ setAuthenticated }) => {
  const navigation = useNavigation();
  const [felhasznalo_nev, setFelhasznaloNev] = useState('');
  const [felhasznalo_jelszo, setFelhasznaloJelszo] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Load the saved rememberMe state from AsyncStorage
    const loadRememberMe = async () => {
      try {
        const storedRememberMe = await AsyncStorage.getItem('rememberMe');
        if (storedRememberMe) {
          setRememberMe(JSON.parse(storedRememberMe));
        }
      } catch (error) {
        console.error('Error loading rememberMe from AsyncStorage:', error);
      }
    };

    loadRememberMe();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/login`, {
        felhasznalo_nev,
        felhasznalo_jelszo,
      });
  
      console.log('Successful login', response.data);
      const felhasznaloId = response.data.felhasznaloId;
  
      // Check if felhasznaloId is not null before proceeding
      if (felhasznaloId !== null) {
        await AsyncStorage.setItem('felhasznaloId', felhasznaloId.toString());
        console.log(felhasznaloId);
        // Save the rememberMe state to AsyncStorage
        await AsyncStorage.setItem('rememberMe', JSON.stringify(rememberMe));
      } else {
        // Handle the case when felhasznaloId is null
        console.error('FelhasznaloId is null');
        Alert.alert('Hiba', 'Helytelen felhasználónév vagy jelszó.');
        return;
      }
  
      const userToken = response.data.token;
      Alert.alert('Sikeres Bejelentkezés', '', [
        {
          text: 'OK',
          onPress: () => {
            if (setAuthenticated) {
              setAuthenticated(true);
            }
  
            navigation.dispatch(
              CommonActions.navigate({
                name: 'Root',
                params: { authenticated: true },
              })
            );
          },
        },
      ]);
    } catch (error) {
      console.error('Hiba a bejelentkezéskor', error);
      Alert.alert('Hiba', 'Helytelen felhasználónév vagy jelszó.');
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Regisztráció');
    setAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Felhasználó név"
        value={felhasznalo_nev}
        onChangeText={(text) => setFelhasznaloNev(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Jelszó"
        secureTextEntry
        value={felhasznalo_jelszo}
        onChangeText={(text) => setFelhasznaloJelszo(text)}
        style={styles.input}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={rememberMe}
          onValueChange={(newValue) => setRememberMe(newValue)}
          label={<Text>Remember Me</Text>}
        />
        
      </View>
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.registerContainer}>
        <Text>Nincs fiókod? </Text>
        <TouchableOpacity onPress={handleNavigateToRegister}>
          <Text style={styles.registerText}>Regisztrálj</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  registerText: {
    color: 'orange',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
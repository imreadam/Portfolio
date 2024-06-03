import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Ipcim from './Ipcim';
import PropTypes from 'prop-types'; // Importáld be a PropTypes-t

const SERVER_URL = Ipcim.Ipcim;

const RegisterScreen = ({ setAuthenticated }) => {
  const navigation = useNavigation();
  const [teljes_nev, setTeljesNev] = useState('');
  const [felhasznalo_nev, setFelhasznaloNev] = useState('');
  const [jelszo, setJelszo] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/register`, {
        felhasznalo_teljesnev: teljes_nev,
        felhasznalo_nev,
        felhasznalo_jelszo: jelszo,
        felhasznalo_email: email,
        felhasznalo_telefon: telefon,
      });

      console.log('Sikeres regisztráció', response.data);
      Alert.alert('Sikeres regisztráció', '', [
        {
          text: 'OK',
          onPress: () => {
            setAuthenticated(true);
            navigation.navigate('Login');
          },
        },
      ]);
    } catch (error) {
      console.error('Hiba a regisztráció során', error);
      Alert.alert('Hiba', 'Hiba a regisztráció során.');
    }
  };
  const handleNavigateToRegister = () => {
    navigation.navigate('Regisztráció Menhelyként');
    setAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Teljes név"
        value={teljes_nev}
        onChangeText={(text) => setTeljesNev(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Felhasználónév"
        value={felhasznalo_nev}
        onChangeText={(text) => setFelhasznaloNev(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Jelszó"
        secureTextEntry
        value={jelszo}
        onChangeText={(text) => setJelszo(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefonszám"
        value={telefon}
        onChangeText={(text) => setTelefon(text)}
        style={styles.input}
      />
      <Button title="Regisztráció" onPress={handleRegister} />
      <View style={styles.registerContainer}>
        <Text>Menhely vagy? </Text>
        <TouchableOpacity onPress={handleNavigateToRegister}>
          <Text style={styles.registerText}>Regisztrálj Menhelyként</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

RegisterScreen.propTypes = {
  setAuthenticated: PropTypes.func.isRequired,
};

RegisterScreen.defaultProps = {
  setAuthenticated: () => {}, 
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
  registerContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    registerText: {
      color: 'orange',
      fontWeight: 'bold',
    },
 
});

export default RegisterScreen;
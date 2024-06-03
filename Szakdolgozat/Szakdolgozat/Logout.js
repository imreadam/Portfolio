import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { CommonActions } from '@react-navigation/native';

const Logout = ({ setAuthenticated }) => {
  const navigation = useNavigation();

  function kilepes()
  {
    setAuthenticated(false);
    navigation.dispatch(
        CommonActions.navigate({
          name: 'Root',
          params: { authenticated: false },
        })
      );
  }
  return (
    
    kilepes()
  );
};

Logout.propTypes = {
  setAuthenticated: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Logout;
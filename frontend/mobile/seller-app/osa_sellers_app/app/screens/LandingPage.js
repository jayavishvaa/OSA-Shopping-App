import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';

import Screen from '../components/Screen';
import authStorage from '../auth/storage';
import Text from '../components/Text';
import Button from '../components/Button';
import routes from '../navigation/routes';
import useAuth from '../auth/useAuth';

function LandingPage({ navigation }) {
    const auth = useAuth();

    const handlelogout = () => {
        auth.logOut();
    }

  return(
    <Screen>
        <View style={styles.container}>
        <Text style={styles.reg}>User registered</Text>
        <Button title="Log Out" style={{ width: '40%'}} onPress={handlelogout}/>
        </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  notRegisteredContainer: {
      padding: 10,
      flex: 1,
      alignItems: 'center',
      paddingTop: '20%'
  },
  reg: {
      fontSize: 30,
      color: 'rgba(0,0,0,0.5)'
  }
});

export default LandingPage;
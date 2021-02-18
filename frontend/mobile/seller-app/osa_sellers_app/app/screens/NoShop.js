import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

import Screen from '../components/Screen';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import routes from '../navigation/routes';

function NoShop({ navigation }) {
  return(
      <Screen>
          <Header/>
          <View style={styles.container}>
            <Fontisto name="shopping-store" size={120} color="rgba(0,0,0,0.5)" />
            <Text style={{
                color: 'gray',
                textAlign: 'center',
                marginVertical: 4
            }}>You have not created your shop yet, create your shop here</Text>
            <Button title="Create my Shop" onPress={() => navigation.navigate(routes.CREATESHOP)}/>
          </View>
      </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: '4%',
  }
});

export default NoShop;
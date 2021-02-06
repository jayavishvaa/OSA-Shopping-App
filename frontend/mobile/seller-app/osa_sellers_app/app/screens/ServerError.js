import React from 'react';
import { StyleSheet, View } from 'react-native';

import Screen from '../components/Screen';
import Header from '../components/Header';
import ShopCard from '../components/ShopCard';
import Text from '../components/Text';

function ServerError(props) {
  return(
      <Screen>
          <Header/>
          <View style={styles.container}>
            <Text>Internal Server Error, we will back soon...</Text>
          </View>
      </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(0,0,0,0.5)'
  }
});

export default ServerError;
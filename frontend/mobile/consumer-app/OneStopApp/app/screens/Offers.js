import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../components/Text';
import Header from '../components/Header';
import Screen from '../components/Screen';
import SearchBar from '../components/SearchBar';

function Offers(props) {
  return(
      <Screen>
          <Header/>
          <SearchBar/>
          <View style={styles.container}><Text>Offers</Text></View>
      </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
});

export default Offers;
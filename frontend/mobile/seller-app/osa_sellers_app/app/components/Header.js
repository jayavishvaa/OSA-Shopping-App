import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from './Text';
import defaultStyles from '../config/styles';

function Header({width}) {
  return(
    <View style={[styles.container, { width }]}>
      <View style={styles.top}>
        <Text style={styles.name}>osa sellers</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
      alignItems: 'center',
      backgroundColor: 'rgba(255,99,71,0.9)',
      paddingBottom: 3
  },
  
  name: {
    fontSize: 25,
    color: 'white',
  },
  top: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    padding: 5
  }
});

export default Header;
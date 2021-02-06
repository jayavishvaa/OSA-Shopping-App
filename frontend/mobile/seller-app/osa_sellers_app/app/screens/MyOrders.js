import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Screen from '../components/Screen';
import Header from '../components/Header';
import Text from '../components/Text';

function MyOrders(props) {
    const [something, setSomething] = useState(false);

    const handlePress = () => {
        setSomething(true);
        console.log(something)
    }
  return(
      <Screen>
          <Header/>
          <TouchableOpacity style={styles.container} onPress={handlePress}>
              <Text>My Orders</Text>
          </TouchableOpacity>
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

export default MyOrders;
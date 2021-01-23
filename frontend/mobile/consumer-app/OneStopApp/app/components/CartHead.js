import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

import Text from '../components/Text';

function CartHead({ numberInCart }) {
  return(
    <View style={styles.cartIcon}>
        <Fontisto name="shopping-bag" size={40} color="rgba(0,0,0,0.8)"/>
        {numberInCart > 0 && <Text style={styles.itemNumberInCart}>{numberInCart}</Text>}
        </View>
  );
}

const styles = StyleSheet.create({
    cartIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35
      },
      itemNumberInCart: {
        position: 'absolute',
        color: 'white',
        fontSize: 14,
        bottom: -2,
      },
});

export default CartHead;
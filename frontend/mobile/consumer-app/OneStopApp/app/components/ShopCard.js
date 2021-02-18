import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

import defaultStyles from '../config/styles';
import Text from '../components/Text';

function ShopCard({
    shopName,
    description,
    sectionData,
    address,
    onPress
}) {
  return(
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Fontisto
            name="shopping-store"
            size={60}
            color="gray"
            style={{ marginRight: 10 }}
        />
        <View style={{
            width: '100%'
        }}>
            <Text style={{
                fontSize: 18
            }}>{shopName}</Text>
            {description && <Text style={{
                fontSize: 16,
                color: 'gray',
                width: '75%',
            }}>{description}</Text>}
            <Text style={styles.addressText}>{address}</Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    addressText: {
        color: 'green',
        fontSize: 17,
        marginTop: 8
    },
  container:{
      flex: 1,
      alignItems: 'center',
      margin: 5,
      backgroundColor: 'rgba(0,0,0,0.07)',
      padding: 10,
      borderRadius: 10,
      flexDirection: 'row'
  },
});

export default ShopCard;
import React, { useState } from 'react';
import { StyleSheet, View, TouchableHighlight, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Text from './Text';
import defaultStyles from '../config/styles';
import Item from './Item';

function SplitCard({ category }) {
    const [active, setActive] = useState(false);
    const handlePress = () => {
        setActive(!active);
    }

    const items = [
        {
            itemName: 'Chana Dal',
            description: 'super fine quality',
            mrp: 90,
            sellingPrice: 85,
            perQty: 'kg'
        },
        {
            itemName: 'Cardamom',
            description: 'super fine green and fresh',
            perQty: 'gms',
            mrp: 5,
            sellingPrice: 4.5,
        },
        {
            itemName: 'Plane Horlicks 1Kg Bottle',
            perQty: 'bottle',
            mrp: 425,
            sellingPrice: 410
        },
        {
            itemName: 'Linc Glycer Blue Pen',
            perQty: 'pcs',
            mrp: 6,
            sellingPrice: 5
        },
        {
            itemName: 'Potato',
            description: 'Fresh bengali potato',
            perQty: 'kg',
            mrp: 22,
            sellingPrice: 22,
        }
    ]

  return(
    <>
      <TouchableHighlight underlayColor="white" onPress={handlePress}>
        <View style={styles.container}>
            <Text style={styles.categoryText}>{category}</Text>
            {!active && <MaterialIcons name="arrow-drop-down" style={styles.dropIcon} size={30} color={defaultStyles.colors.medium} />}
            {active && <MaterialIcons name="arrow-drop-up" style={styles.dropIcon} size={30} color={defaultStyles.colors.medium} />}
        </View>
        </TouchableHighlight>
        {active && <FlatList
            data={items}
            keyExtractor={(item) => item.itemName}
            showsVerticalScrollIndicator={false}
            renderItem={category => (
              <Item 
                itemName={category.item.itemName}
                description={category.item.description}
                mrp={category.item.mrp}
                sellingPrice={category.item.sellingPrice}
                perQty={category.item.perQty}
            />
            )}
        />}
        </>
  );
}

const styles = StyleSheet.create({
  container:{
      borderRadius: 15,
      marginVertical: 5,
      flexDirection: 'row',
      padding: 8,
      width: '100%',
      backgroundColor: '#ffe8a8',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  categoryText: {
      color: '#910027',
        fontSize: 25,
        fontWeight: 'bold'
  },
  dropDownListBox: {
    height: 500,
    backgroundColor: defaultStyles.colors.light
  },
  dropIcon: {
      position: 'absolute',
      right: 10,
  }
});

export default SplitCard;
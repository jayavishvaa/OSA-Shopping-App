import React, { useState } from 'react';
import { StyleSheet, TextInput, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';
import Text from './Text';

function Item({ perQty, sellingPrice, mrp, itemName, description, onEdit, onDelete, categoryName, insideCategory }) {
    const [itemPress, setItemPress] = useState(false);
    
    sellingPrice = parseFloat(sellingPrice);
  return(
      <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={() => setItemPress(!itemPress)}
      >
        {!insideCategory && categoryName && <View style={{
            right: 15,
            alignItems: 'flex-end',
            width: '100%',
            paddingLeft: 15,
            paddingVertical: 2,
        }}>
            <Text style={{ color: 'violet' }}>{categoryName}</Text>
        </View>}
        <View style={styles.itemHead}>
            <Entypo name="image-inverted" style={styles.image} size={100} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{itemName}</Text>
                {description !== '' && <Text style={styles.itemDescription}>{description}</Text>}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.itemPricings}>
                        <Text style={styles.priceColumn}>MRP:  </Text>
                        <Text style={styles.mrp}>{`\u20B9${mrp}`}</Text>
                        <Text style={styles.perQty}>{`/${perQty}`}</Text>
                    </View>
                    <Text>                              </Text>
                </ScrollView>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.itemPricings}>
                        <Text style={styles.priceColumn}>S P :  </Text>
                        <Text style={styles.sellingPrice}>{`\u20B9${sellingPrice}`}</Text>
                        <Text style={styles.perQty}>{`/${perQty}`}</Text>
                    </View>
                    <Text>                              </Text>
                </ScrollView>
            </View>
        </View>
        {itemPress && 
        <>
        <View style={styles.separatorEditDelete}/>
        <View style={styles.editAndDelete}>
            <MaterialIcons
                name="edit"
                size={30}
                color="gray"
                onPress={onEdit}
                style={{ marginRight: '25%' }}
            />
            <Text
                style={{ fontSize: 22, color: 'rgba(0,0,0,0.3)' }}
            >|</Text>
            <MaterialIcons
                name="delete"
                size={30}
                color="rgba(255,0,0,0.8)"
                onPress={onDelete}
                style={{ marginLeft: '25%' }}
            />
        </View>
        </>}
        <View style={styles.separator}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    addToCart: {
        backgroundColor: 'rgba(0, 110, 0, 0.8)',
        padding: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        position: 'absolute',
        right: 10
    },
    addToCartText: {
        color: 'white',
    },
  container:{
      backgroundColor: defaultStyles.colors.light,
      marginBottom: 10
  },
  editAndDelete: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3
  },
  giveQuantity: {
    marginHorizontal: 5,
    color: 'rgba(0,0,0,0.8)'
  },
  priceColumn: {
    color: 'rgba(0,0,0,0.7)'
  },
  image: {
      color: "rgba(0, 0, 0, 0.63)",
      margin: 4
  },
  itemHead: {
      flexDirection: 'row'
  },
  itemDetails: {
    margin: 8
  },
  itemName: {
    fontWeight: 'bold'
  },
  itemDescription: {
    color: defaultStyles.colors.medium
  },
  itemPricings: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  itemDiscounts: {
    margin: 4,
    marginHorizontal: 15,
},
mrp: {
    fontWeight: 'bold',
    color: 'rgba(0,0,255,0.7)',
    fontSize: 20
},
perQty: {
    color: 'rgba(0,0,0,0.5)'
},
  picker: {
    height: 40,
    width: '20%',
    marginLeft: 4,
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 4,
    color: defaultStyles.colors.medium
  },
  quantityError: {
    color: 'red'
  },
  save: {
    color: '#b700d3'
  },
  sellingPrice: {
      fontWeight: 'bold',
      color: 'green',
      fontSize: 20
  },
  selectQty: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 4,
  },
  separator: {
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginTop: 8
  },
  separatorEditDelete: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginTop: 8
  },
  writeBox: {
      backgroundColor: 'white',
      width: 70,
      height: 40,
      borderRadius: 10,
      fontSize: 20,
      color: defaultStyles.colors.medium,
      paddingHorizontal: 3,
      marginHorizontal: 3
  }
});

export default Item;
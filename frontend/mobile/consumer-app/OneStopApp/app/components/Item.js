import React, { useState } from 'react';
import { StyleSheet, TextInput, View, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

import defaultStyles from '../config/styles';
import Text from './Text';

function Item({ perQty, sellingPrice, mrp, itemName, description }) {
    const [qntError, setQntError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    sellingPrice = parseFloat(sellingPrice);
    const [price, setPrice] = useState(sellingPrice.toFixed(2));
    const [quantity, setQuantity] = useState(1);
    const [changePrice, setChangePrice] = useState((perQty === 'kg' || perQty === 'gms' || perQty === 'ltr' || perQty === 'ml'));

    const handleChangeQty = text => {
        if (!(Number.isInteger(parseInt(text)) || text === '')) return setQntError(true);
        setQntError(false);
        if (text === '') text = 0;
        if (perQty === 'kg' || perQty === 'gms' || perQty === 'ltr' || perQty === 'ml') {
            const price = parseFloat(text) * sellingPrice;
            setPrice(price.toFixed(2));
            setQuantity(parseFloat(text));
        } else {
            if (!(Number.isInteger(parseFloat(text)))) return setQntError(true);
            setQntError(false);
            const price = parseInt(text) * sellingPrice;
            setPrice(price.toFixed(2));
            setQuantity(parseInt(text));
        }
    }

    const handleChangePrice = text => {
        if (!(Number.isInteger(parseInt(text)) || text === '')) return setPriceError(true);
        setPriceError(false);
        if (text === '') text = 0;
        if (perQty === 'kg' || perQty === 'gms' || perQty === 'ltr' || perQty === 'ml') {
            setPrice(parseFloat(text));
            const quantity = parseFloat(text) / sellingPrice;
            if (perQty === 'kg' || perQty === 'ltr') setQuantity(quantity.toFixed(3));
            else setQuantity(quantity.toFixed(0));
        } else {
            if (!(Number.isInteger(parseFloat(text)))) return setPriceError(true);
            setPriceError(false);
            setChangePrice(false);
        }
    }

    const handlePressAddToCart = () => {
        Alert.alert(
            `${itemName} is successfully added to your cart`,
            `Quantity: ${quantity} ${perQty} \nPrice: \u20B9${price}`,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
    }
  return(
    <View style={styles.container}>
        <View style={styles.itemHead}>
            <Entypo name="image-inverted" style={styles.image} size={100} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{itemName}</Text>
                <Text style={styles.itemDescription}>{description}</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.itemPricings}>
                        <Text style={styles.sellingPrice}>{`\u20B9${sellingPrice}`}</Text>
                        <Text style={styles.perQty}>{`/${perQty}`}</Text>
                        {((mrp-sellingPrice) > 0) && 
                            <View style={styles.itemDiscounts}>
                                <Text style={styles.mrp}>{`MRP: \u20B9${mrp}/${perQty}`}</Text>
                                <Text style={styles.save}>{`You Save: \u20B9${mrp - sellingPrice}/${perQty}`}</Text>
                            </View>}
                    </View>
                    <Text>                              </Text>
                </ScrollView>
            </View>
        </View>
        <View style={styles.selectQty}>
            <Text style={styles.giveQuantity}>Quantity:</Text>
            <TextInput
                onChangeText={handleChangeQty}
                textAlign="right"
                style={styles.writeBox}
                defaultValue={quantity.toString()}
                keyboardType="number-pad"
            />
            <Text style={styles.picker}>{perQty}</Text>
        </View>
        {qntError && <Text style={styles.quantityError}>Please provide a valid quantity</Text>}
        <View style={styles.selectQty}>
            <Text style={styles.giveQuantity}>Price:</Text>
            <Text style={styles.sellingPrice}>{`\u20B9`}</Text>
            {changePrice && <TextInput
                onChangeText={handleChangePrice}
                textAlign="right"
                style={[styles.writeBox, styles.sellingPrice, { width: null, paddingHorizontal: 5}]}
                defaultValue={price.toString()}
                keyboardType="number-pad"
            />}
            {!changePrice && <Text style={styles.sellingPrice}>{price.toString()}</Text>}
            <Text style={styles.sellingPrice}>/-</Text>
            {!qntError && !priceError && (price > 0) && (quantity > 0) && <TouchableHighlight style={styles.addToCart} onPress={handlePressAddToCart}>
                <Text style={styles.addToCartText}>Add to cart</Text>
            </TouchableHighlight>}
        </View>
        {priceError && <Text style={styles.quantityError}>Please provide a valid price</Text>}
        <View style={styles.separator}/>
    </View>
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
  giveQuantity: {
    marginHorizontal: 5,
    color: 'rgba(0,0,0,0.8)'
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
      color: defaultStyles.colors.medium,
      textDecorationLine: 'line-through'
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
      fontSize: 22
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
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign, Entypo, Fontisto, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import Text from './Text';

function CartItem({ name, description, mrp, price, quantity, perQty, shop, keptAt, shopDetails, onEdit, onDelete }) {
    const [shopDetailView, setShopDetailView] = useState(false);
    const [saving] = useState((mrp * quantity - price).toPrecision(2));

    function date(keptAt) {
        const year = keptAt.substr(0, 4);
        const month = parseInt(keptAt.substr(5, 2));
        const day = keptAt.substr(8, 2);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${day} ${months[month-1]}, ${year}`
    }

  return(
    <TouchableOpacity
        activeOpacity={0.9}
        style={styles.container}
        onPress={() => setShopDetailView(!shopDetailView)}
    >
        <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
            <Entypo name="image-inverted" size={75} color="gray" />
            <View style={{
                marginLeft: 5,
                marginTop: 5,
                width: '50%'
            }}>
                <Text style={{
                    fontSize: 17,
                    color: 'rgba(0,0,0,0.9)',
                    marginBottom: 2,
                    width: '100%'
                }}>{name}</Text>
                {description !== '' && <Text style={{
                    fontSize: 16,
                    color: 'gray',
                    marginTop: -2,
                    marginBottom: 2
                }}>{description}</Text>}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                    <AntDesign name="tag" size={24} color="rgba(0,0,0,0.4)" />
                    <Text style={{
                        color: 'darkblue',
                        fontWeight: 'bold'
                    }}>{` \u20B9${mrp}`}</Text>
                    <Text style={{
                        fontSize: 17,
                        color: "rgba(0,0,0,0.6)"
                    }}>/{perQty}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                    <FontAwesome5 name="shopping-basket" size={24} color="rgba(0,0,0,0.4)" />
                    <Text style={{
                        color: 'rgba(0,0,0,0.7)',
                        marginLeft: 2,
                    }}> {quantity} {perQty}</Text>
                </View>
                {saving > 0 && <Text style={{
                    color: 'green',
                    fontSize: 16,
                    marginLeft: 2,
                }}>{`You save \u20B9${saving}`}</Text>}
            </View>
            <Text style={{
                color: 'rgba(0,0,0,0.7)',
                fontSize: 16,
                marginLeft: 2,
                position: 'absolute',
                top: '3%',
                right: '2%'
            }}> {date(keptAt)}</Text>
            <Text style={{
                color: 'darkgreen',
                fontSize: 20,
                fontWeight: 'bold',
                position: 'absolute',
                bottom: '8%',
                right: '2%'
            }}>{`\u20B9${price}/-`}</Text>
        </View>
        {shopDetailView && <View style={{
            borderTopWidth: 1,
            borderTopColor: 'rgba(0,0,0,0.2)',
            paddingVertical: 5,
            paddingHorizontal: 5,
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <Fontisto name="shopping-store" size={30} color="rgba(0,0,0,0.7)" />
            <View style={{
                width: '60%',
                marginLeft: 8,
                borderRightColor: 'rgba(0,0,0,0.2)',
                borderRightWidth: 1
            }}>
                <Text style={{
                    color: 'rgba(50,0,0,0.7)',
                    fontSize: 17,
                }}>{shopDetails.shopName}</Text>
                <Text style={{
                    color: 'rgba(50,0,100,0.7)',
                    fontSize: 15,
                    fontStyle: 'italic'
                }}>{shopDetails.streetName}</Text>
            </View>
            <MaterialIcons
                name="edit" 
                size={27} 
                color="rgba(0,0,0,0.7)" 
                onPress={onEdit}
                style={{
                    marginLeft: 15
                }}
            />
            <MaterialIcons 
                name="delete" 
                size={27} 
                color="red" 
                onPress={onDelete}
                style={{ 
                    position: 'absolute',
                    right: 15
                }}
            />
        </View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{
      width: '97%',
      backgroundColor: 'rgba(0,0,0,0.09)',
      marginHorizontal: 5,
      marginBottom: 5,
      padding: 3,
      borderBottomColor: 'rgba(0,0,0,0.2)',
      borderBottomWidth: 2
  }
});

export default CartItem;
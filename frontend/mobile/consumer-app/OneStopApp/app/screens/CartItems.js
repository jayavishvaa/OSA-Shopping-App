import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';

import Screen from '../components/Screen';
import Header from '../components/Header';
import Text from '../components/Text';
import CartItem from '../components/CartItem';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import Loading from './Loading';
import defaultStyles from '../config/styles';
import userApi from '../api/users';
import useAuth from '../auth/useAuth';
import routes from '../navigation/routes';

function CartItems({ route, navigation }) {
    const auth = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [items, setItems] = useState();
    const [noItems, setNoItems] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

  const getData = async () => {
    setLoading(true);
    const result = await userApi.getCartItems({ userId: auth.user._id });
    if (!result.ok) {
      setLoading(false);
      setError(true);
      return;
    }
    setError(false);
    setLoading(false);
    setItems(result.data);
    if (result.data.length === 0) return setNoItems(true);
    setNoItems(false);
    let tempPrice = 0;
    result.data.forEach(element => {
      tempPrice += element.price;
      setTotalPrice(tempPrice);
    });
  }

  console.log(Object.keys(route.params).length);
  if (Object.keys(route.params).length === 0 && route.params.constructor === Object) {
    useEffect(() => {
      setTotalPrice(0);
      getData();
    }, []);
  }

  const handleEdit = () => {
    console.log("please edit it bro")
  }

  const handleDelete = async itemId => {
    setLoading(true);
    const result = await userApi.deleteCartItem({ userId: auth.user._id, itemId });
    if (!result.ok) {
      setLoading(false);
      setError(true);
      return;
    }
    setError(false);
    setLoading(false);
    getData();
  }
  return(
    <Screen>
      <Header/>
      <SearchBar/>
        {loading
        ? <Loading/>
        : <>
        <View style={styles.container}>
        {noItems && <Text style={{
            color: 'gray',
            alignSelf: 'center',
            marginTop: '5%'
        }}>There is no item here...</Text>}
        <FlatList
            data={items}
            style={{ height: '88%' }}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => 
                <CartItem 
                    name={item.name}
                    description={item.description}
                    mrp={item.mrp}
                    price={item.price}
                    perQty={item.perQty}
                    quantity={item.quantity}
                    shop={item.shop}
                    shopDetails={item.shopDetails}
                    keptAt={item.keptAt}
                    onEdit={handleEdit}
                    onDelete={() => handleDelete(item._id)}
                />
            }
        />
        </View>
        <View style={{
          backgroundColor: 'rgba(0,0,0,0.1)',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '13%',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            position: 'absolute',
            top: '5%',
            right: '4%'
          }}>
            <Text style={{
              fontStyle: 'italic',
              color: 'rgba(0,0,0,0.7)',
              fontSize: 17
            }}>Total  </Text>
            <Text style={{
              fontWeight: 'bold',
              color: 'darkgreen',
              fontSize: 25
            }}>{`\u20B9${totalPrice}/-`}</Text>
          </View>
          <Button style={{
            position: 'absolute',
            bottom: 0,
            width: '90%',
            alignSelf: 'center'
          }} title="Proceed" />
        </View>
        </>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    paddingTop: 5,
    height: '74.5%'
  },
});

export default CartItems;
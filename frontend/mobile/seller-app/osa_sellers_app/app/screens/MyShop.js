import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

import Screen from '../components/Screen';
import Header from '../components/Header';
import ShopCard from '../components/ShopCard';
import Text from '../components/Text';
import Loading from './Loading';
import shopApi from '../api/shops';
import useAuth from '../auth/useAuth';
import routes from '../navigation/routes';

function MyShop({ navigation }) {
    const auth = useAuth();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shop, setShop] = useState();

    const getShop = async () => {
        if (!auth.user.shop) return navigation.navigate(routes.NOSHOP);
        setLoading(true);
        const result = await shopApi.getShopById(auth.user.shop);
        if (!result.ok) return setError(true);
        setError(false);
        if (result.data === "no-shop-for-given-seller") {
            setLoading(false);
            navigation.navigate(routes.NOSHOP);
            return;
        }
        setShop(result.data);
        setLoading(false);
    }

    useEffect(() => {
        getShop();
    });

    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
      }
    if (shop) shop.sections[0] = toTitleCase(shop.sections[0]);
  return(
      <Screen>
          <Header/>
          {loading && <Loading/>}
          {error && <Text style={{ color: 'red' }}>Server Error, Please retry after some time...</Text>}
          {shop && <View style={styles.container}>
            <ShopCard
                shopName={shop.shopName.toUpperCase()}
                description={shop.description}
                address={shop.streetName}
                sectionData={shop.sections}
                pinCode={shop.pinCode}
            />
            <TouchableOpacity
                style={styles.list}
                onPress={() => navigation.navigate(routes.MYCATEGORIES)}
            >
                <Entypo name="colours" size={24} color="rgba(0,0,0,0.7)" />
                <Text style={{
                    marginLeft: 15,
                    color: "rgb(50,50,50)",
                }}>My Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.list}
                onPress={() => navigation.navigate(routes.MYITEMS, { categoryName: null })}
            >
                <FontAwesome5 name="box-open" size={22} color="rgba(0,0,0,0.7)" />
                <Text style={{
                    marginLeft: 15,
                    color: "rgb(50,50,50)",
                }}>Total Items</Text>
            </TouchableOpacity>
          </View>}
      </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
      width: '100%',
      height: '100%',
      padding: 10,
      alignItems: 'center'
  },
  list: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '98%',
    borderRadius: 10,
    height: 60,
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40
  }
});

export default MyShop;
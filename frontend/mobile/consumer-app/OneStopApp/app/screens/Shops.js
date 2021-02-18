import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Screen from '../components/Screen';
import ShopCard from '../components/ShopCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Text from '../components/Text';
import Loading from './Loading';
import useAuth from '../auth/useAuth';
import shopsApi from '../api/shops';
import routes from '../navigation/routes';

function Shops({ route, navigation }) {
    const auth = useAuth();
    const [shops, setShops] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getShops = async () => {
        setLoading(true);
        const result = await shopsApi.shops(route.params.apiEndPoint, auth.user.pinCode);
        if (!result.ok) {
            setLoading(false);
            setError(true);
            return;
        }
        setLoading(false);
        setError(false);
        setShops(result.data);
    }
    useEffect(() => {
        getShops();
    }, []);

  return(
      <Screen>
          <Header/>
            <SearchBar/>
            {loading 
            ? <Loading/>
            : <FlatList
              data={shops}
              keyExtractor={(item) => item._id}
              style={{ marginHorizontal: 4}}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => ( 
                  <ShopCard
                      onPress={() => navigation.navigate(routes.CATEGORIES, { shopId: item._id })}
                      shopName={item.shopName}
                      description={item.description}
                      address={item.streetName}
                  />
              )}
            />
            }
      </Screen>
  );
}

const styles = StyleSheet.create({
    
});

export default Shops;
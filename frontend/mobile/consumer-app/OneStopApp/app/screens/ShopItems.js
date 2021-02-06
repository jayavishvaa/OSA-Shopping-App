import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';

import Screen from '../components/Screen';
import Header from '../components/Header';
import Text from '../components/Text';
import Item from '../components/Item';
import SearchBar from '../components/SearchBar';
import Loading from './Loading';
import defaultStyles from '../config/styles';
import shopsApi from '../api/shops';
import routes from '../navigation/routes';

function ShopItems({ route, navigation }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [items, setItems] = useState();
    const [noItems, setNoItems] = useState(false);

  const getData = async () => {
    setLoading(true);
    const result = await shopsApi.getItems(route.params.shopId, route.params.categoryName);
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
  }

  useEffect(() => {
    getData();
  }, []);

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
                <Item 
                    itemName={item.name}
                    description={item.description}
                    mrp={item.MRP}
                    sellingPrice={item.sellingPrice}
                    perQty={item.perQty}
                    shopId={route.params.shopId}
                />
            }
        />
        </View>
        </>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
    padding: 5,
  },
  categoryText: {
    fontSize: 35,
    color: defaultStyles.colors.medium,
    marginBottom: 10,
  }
});

export default ShopItems;
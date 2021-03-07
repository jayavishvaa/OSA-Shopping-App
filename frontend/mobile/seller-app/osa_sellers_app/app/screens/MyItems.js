import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Header from '../components/Header';
import Text from '../components/Text';
import Loading from './Loading';
import Item from '../components/Item';
import routes from '../navigation/routes';
import shopsApi from '../api/shops';
import useAuth from '../auth/useAuth';

function MyItems({ route, navigation }) {
    const auth = useAuth();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [categoryName, setCategoryName] = useState();

    const getItems = async () => {
        setLoading(true);
        const result = await shopsApi.getItems(auth.user.shop, route.params.categoryName);
        if (!result.ok) {
            setError(true);
            return setLoading(false);
        }

        setItems(result.data);
        setLoading(false);
        if (result.data.length === 0) return navigation.navigate(routes.NOITEMS, {
            categoryName: route.params.categoryName
        });
    }
    const handleDeleteItem = async _id => {
        setLoading(true);
        const result = await shopsApi.deleteItem(_id);
        if (!result.ok) {
            setError(true)
            return setLoading(false);
        }
        setLoading(false);
        onRefresh();
    }
    const onRefresh = () => {
        setRefreshing(true);
        getItems();
        setRefreshing(false);
    }
    useEffect(() => {
        setCategoryName(route.params.categoryName);
        getItems();
        onRefresh();
    }, []);

  return(
    <Screen>
    <Header/>
    {loading ? <Loading/> : 
      <>
      <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 5
      }}>
      <FontAwesome5
        name="box-open"
        size={70}
        color="rgba(0,0,0,0.5)"
      />
      {items.length !== 0 && <View style={{
          flexDirection: 'row',
          backgroundColor: 'rgba(0,0,0,0.05)',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          paddingHorizontal: 8
      }}>
          <Text style={{ color: 'purple', fontWeight: 'bold' }}>{items.length}</Text>
          {items.length === 1 && <Text style={{ color: 'gray' }}> item</Text>}
          {items.length > 1 && <Text style={{ color: 'gray' }}> items</Text>}
      </View>}
      </View>
      {categoryName &&
      <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.1)',
          padding: 10,
          marginBottom: 10
        }}>
        <Entypo
            name="colours"
            size={25}
            color="rgba(0,0,0,0.5)"
            style={{ marginHorizontal: 10 }}
        />
        <Text style={{ color: 'rgba(0,0,0,0.7)'}}>
            {categoryName}
        </Text>
      </View>}
      <View style={styles.container}>
      <FlatList
          data={items}
          style={{ width: '100%' }}
          contentContainerStyle={{ marginLeft: 10 }}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
                <Item
                    itemName={item.name}
                    description={item.description}
                    mrp={item.MRP}
                    sellingPrice={item.sellingPrice}
                    perQty={item.perQty}
                    onEdit={() => navigation.navigate(routes.ADDITEM, { 
                        ...item, categoryName: route.params.categoryName
                    })}
                    categoryName={item.shopCategory}
                    insideCategory={categoryName}
                    onDelete={() => handleDeleteItem(item._id)}
                />
          )}
          refreshControl={
              <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={refreshing}
                  onRefresh={onRefresh}
              />
          }
      />
      <TouchableOpacity
          style={{ position: 'absolute', bottom: '2%', right: '2%'}}
          onPress={() => navigation.navigate(routes.ADDITEM, { categoryName })}
      >
          <Entypo
              name="circle-with-plus"
              size={75}
              color="rgba(0,0,255,0.6)"
          />
      </TouchableOpacity>
      </View>
      </>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems: 'center',
  },
});

export default MyItems;
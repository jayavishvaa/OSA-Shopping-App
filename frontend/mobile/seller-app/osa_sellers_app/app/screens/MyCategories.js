import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, RefreshControl,Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import Screen from '../components/Screen';
import Text from '../components/Text';
import Loading from './Loading';
import routes from '../navigation/routes';
import shopsApi from '../api/shops';
import useAuth from '../auth/useAuth';
import Header from '../components/Header';


function MyCategories({ navigation }) {
    const auth = useAuth();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [longPress, setLongPress] = useState(false);

    const getCategories = async () => {
        setLoading(true);
        const result = await shopsApi.getShopById(auth.user.shop);
        if (!result.ok) return setError(true);

        setCategories(result.data.categories);
        setLoading(false);
        if (result.data.categories.length === 0) return navigation.navigate(routes.NOCATEGORIES);
    }
    useEffect(() => {
        getCategories();
    }, []);

    const handlePress = (name) => {
        navigation.navigate(routes.MYITEMS, { categoryName: name });
    }

    const onRefresh = () => {
        setRefreshing(true);
        getCategories();
        setRefreshing(false);
    }
    console.log(longPress);


  return(
      <Screen>
          <Header/>
          {loading ? <Loading/> : 
            <>
            {/* <Entypo
                name="colours"
                size={80}
                color="rgba(0,0,0,0.5)"
                style={{ alignSelf: 'center' }}
            /> */}
            <Image
                source={require('../assets/MyCategory.png')}
                style={{width:"80%",height:'40%',marginBottom:'5%',alignSelf:'center'}}
            />
            <View style={styles.container}>
            <FlatList
                data={categories}
                style={{ width: '100%' }}
                contentContainerStyle={{ marginLeft: 10 }}
                keyExtractor={category => category._id}
                renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.list}
                    onPress={() => handlePress(item.name)}
                    onLongPress={() => setLongPress(!longPress)}
                >
                    <Text style={{
                        marginLeft: 15,
                        color: "rgb(50,50,50)",
                    }}>{item.name}</Text>
                </TouchableOpacity>
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
                onPress={() => navigation.navigate(routes.ADDCATEGORY)}
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
  list: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '98%',
    borderRadius: 10,
    height: 60,
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15
  }
});

export default MyCategories;
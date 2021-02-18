import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Entypo } from "@expo/vector-icons";

import Text from '../components/Text';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Screen from '../components/Screen';
import Loading from './Loading';
import routes from '../navigation/routes';
import useAuth from '../auth/useAuth';
import userApi from '../api/users';

function WhisList({ navigation }) {
    const auth = useAuth();
    const [lists, setLists] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getLists = async () => {
        setLoading(true);
        const result = await userApi.getLists({ userId: auth.user._id });
        if (!result.ok) {
            setLoading(false);
            setError(true);
            return;
        }
        setError(false);
        setLoading(false);
        setLists(result.data);
    }

    useEffect(() => {
        getLists();
    }, []);

  return(
      <Screen>
          <Header/>
          <SearchBar/>
          {loading ? <Loading />
          : <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, {
                    backgroundColor: "rgba(50,0,150,1)",
                    marginTop: 20
                }]}
                onPress={() => navigation.navigate(routes.CARTITEMS, {})}
            >
                <Entypo
                    name="shopping-cart"
                    size={24}
                    color="white"
                    style={{ marginRight: 10 }}
                />
                <Text style={styles.textStyle}>My Cart</Text>
            </TouchableOpacity>
            <FlatList
                data={lists}
                keyExtractor={(item) => item._id}
                style={{ marginTop: 10, width: '100%' }}
                contentContainerStyle={{ alignItems: 'center' }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate(routes.CARTITEMS, { listId: item._id, listName: item.name })}
                        style={[styles.button, {
                            backgroundColor: "gray",
                            marginBottom: 5
                    }]}>
                        <Text style={[styles.textStyle, { width: "100%" }]}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
          <TouchableOpacity
                style={{ position: 'absolute', bottom: '2%', right: '2%'}}
                // onPress={() => navigation.navigate(routes.ADDCATEGORY)}
            >
                <Entypo
                    name="circle-with-plus"
                    size={75}
                    color="rgba(0,0,0,0.6)"
                />
            </TouchableOpacity>
          </View>
          }
      </Screen>
  );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        width: "90%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    container:{
        flex: 1,
        alignItems: 'center',
    },
    textStyle: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
        marginLeft: 3
    },
});

export default WhisList;
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';

import Screen from '../components/Screen';
import Header from '../components/Header';
import Text from '../components/Text';
import SearchBar from '../components/SearchBar';
import CategoryButton from '../components/CategoryButton';
import Loading from './Loading';
import defaultStyles from '../config/styles';
import shopsApi from '../api/shops';
import routes from '../navigation/routes';

function Categories({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState();

  const getData = async () => {
    setLoading(true);
    const result = await shopsApi.getCategories(route.params.shopId);
    if (!result.ok) {
      setLoading(false);
      setError(true);
      return;
    }
    setError(false);
    setLoading(false);
    setCategories(result.data);
  }

  useEffect(() => {
    getData();
  }, []);

  const handlePressCategory = categoryName => {
    navigation.navigate(routes.SHOPITEMS, {
      shopId: route.params.shopId,
      categoryName
    })
  }

  return(
    <Screen>
      <Header/>
      <SearchBar/>
        {loading
        ? <Loading/>
        : <>
        <View style={styles.container}>
        <CategoryButton
          onPress={() => handlePressCategory(null)}
          categoryName="All Items"
        />
        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}
          style={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryButton
              onPress={() => handlePressCategory(item.name)}
              categoryName={item.name}
            />
          )}
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

export default Categories;
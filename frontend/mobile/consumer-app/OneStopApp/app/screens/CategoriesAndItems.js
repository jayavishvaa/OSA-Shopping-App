import React from 'react';
import { StyleSheet, View, FlatList, ScrollView } from 'react-native';

import Screen from '../components/Screen';
import Header from '../components/Header';
import SplitCard from '../components/SplitCard';
import Text from '../components/Text';
import SearchBar from '../components/SearchBar';
import CartHead from '../components/CartHead';
import defaultStyles from '../config/styles';

function CategoriesAndItems(props) {
  const categories = ['Stationaries', 'Beverages', 'Cold-drinks', 'Personal-Care Items']
  return(
    <Screen>
      <Header/>
      <CartHead numberInCart={1}/>
      <SearchBar/>
      <View style={styles.container}>
          <FlatList
              data={categories}
              keyExtractor={(item) => item}
              style={{ height: '89%' }}
              showsVerticalScrollIndicator={false}
              renderItem={category => (
                // console.log(category)
                <SplitCard category={category.item}/>
              )}
          />
      </View>
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

export default CategoriesAndItems;
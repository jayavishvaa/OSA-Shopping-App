import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Screen from '../components/Screen';
import ShopCard from '../components/ShopCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import routes from '../navigation/routes';
import CartHead from "../components/CartHead";

function Shops({ navigation }) {
    const shopData = [
        {
            shopName: 'Prime Mart',
            description: 'Deals in whole range of stationaries, grocery and personal care items',
            sectionData: ['Grocery', 'Stationaries', 'Beverages'],
            address: 'Near Railway Station, Hirapur more, Dhanbad'
        },
        {
            shopName: 'Kolkata Bazar',
            description: 'Deals in all types of clothings and party wears',
            sectionData: ['Clothings', 'Party Wear'],
            address: 'Bank more, Dhanbad'
        },
        {
            shopName: 'Prime Mart 2',
            description: 'Deals in whole range of stationaries, grocery and personal care items',
            sectionData: ['Grocery', 'Stationaries', 'Beverages'],
            address: 'Near Railway Station, Hirapur more, Dhanbad'
        },
        {
            shopName: 'Kolkata Bazar 2',
            description: 'Deals in all types of clothings and party wears',
            sectionData: ['Clothings', 'Party Wear'],
            address: 'Bank more, Dhanbad'
        },
        {
            shopName: 'Prime Mart 3',
            description: 'Deals in whole range of stationaries, grocery and personal care items',
            sectionData: ['Grocery', 'Stationaries', 'Beverages'],
            address: 'Near Railway Station, Hirapur more, Dhanbad'
        },
        {
            shopName: 'Kolkata Bazar 3',
            description: 'Deals in all types of clothings and party wears',
            sectionData: ['Clothings', 'Party Wear'],
            address: 'Bank more, Dhanbad'
        }
    ];

  return(
      <Screen>
          <Header/>
            <CartHead numberInCart={1}/>
            <SearchBar/>
          <FlatList
            data={shopData}
            keyExtractor={(item) => item.shopName}
            style={{ marginHorizontal: 4}}
            showsVerticalScrollIndicator={false}
            renderItem={shop => (
                <ShopCard
                onPress={() => navigation.navigate(routes.CATEGORIESANDITEMS)}
                    shopName={shop.item.shopName}
                    description={shop.item.description}
                    sectionData={shop.item.sectionData}
                    address={shop.item.address}
                />
            )}
        />
      </Screen>
  );
}

const styles = StyleSheet.create({
    
});

export default Shops;
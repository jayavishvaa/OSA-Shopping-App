import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import defaultStyles from '../config/styles';

function SearchBar(props) {
  return(
    <View style={styles.container}>
    <View style={styles.searchBar}>
        <Entypo name="magnifying-glass" style={{ marginHorizontal: 6 }} size={24} color="rgba(0,0,0,0.4)" />
        <TextInput style={styles.searchPlaceholder} placeholder="Search for shops, products..."/>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: defaultStyles.colors.primary,
        paddingBottom: 3
    },
    searchBar: {
        backgroundColor: 'white',
        width: "90%",
        padding: 5,
        marginVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row'
      },
      searchPlaceholder: {
        fontSize: 18
      },
});

export default SearchBar;
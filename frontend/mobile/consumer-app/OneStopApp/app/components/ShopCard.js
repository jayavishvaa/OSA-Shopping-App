import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import defaultStyles from '../config/styles';
import Text from '../components/Text';

function ShopCard({shopName, description, sectionData, address, onPress}) {
  return(
    <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.shopCard}>
                <Text style={styles.title}>{shopName}</Text>
                {description && <Text style={styles.description}>{description}</Text>}
                <View style={styles.sections}>
                    <FlatList
                        data={sectionData}
                        keyExtractor={(item) => item}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.section}><Text style={styles.sectionText}>{item}</Text></View>
                        )}
                    />
                </View>
                <View style={styles.address}>
                    <Text style={styles.addressHead}>Address: </Text>
                    <Text style={styles.addressText}>{address}</Text>
                </View>
            </View>
        </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    address: {
        flexDirection: 'row',
        width: '90%',
    },
    addressHead: {
        color: defaultStyles.colors.black
    },
    addressText: {
        color: 'green',
        fontSize: 17
    },
  container:{
      flex: 1,
      alignItems: 'center',
      margin: 5
  },
  shopCard: {
      backgroundColor: '#fdeff9',
      borderRadius: 25,
      width: '100%',
      padding: 15,
    //   shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,  
    // elevation: 5
  },
  title: {
      fontWeight: "bold",
      color: '#03001e',
      fontSize: 24,
      alignSelf: 'center',
      textShadowColor: 'black',
      textShadowOffset: {
          width: 0, height: 1
      },
  },
  description: {
      fontSize: 17,
      color: defaultStyles.colors.medium
  },
  sections: {
    flexDirection: 'row',
    marginVertical: '3%',
  },
  section: {
      height: 40,
      width: 150,
      backgroundColor: '#9796f0',
      margin: 4,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    //   shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,  
    // elevation: 5
  },
  sectionText: {
    color: defaultStyles.colors.white
  }
});

export default ShopCard;
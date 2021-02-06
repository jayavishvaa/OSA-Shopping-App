import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

import defaultStyles from '../config/styles';
import Text from '../components/Text';

function ShopCard({shopName, description, sectionData, address, pinCode}) {
  return(
    <View style={styles.container}>
        <View style={styles.shopCard}>
            <View style={styles.rowFlex}>
                <Fontisto
                    name="shopping-store"
                    style={{ top: '5%', marginRight: 10 }}
                    size={60}
                    color="gray"
                />
            <View style={{ width: "80%" }}>
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
            <Text style={styles.addressText}>{`${address}, ${pinCode}`}</Text>
            </View>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    address: {
        flexDirection: 'row',
        width: '90%',
    },
    addressText: {
        color: 'green',
        fontSize: 17,
        marginLeft: 5
    },
  container:{
      alignItems: 'center',
      margin: 5,
      width: '100%',
  },
  rowFlex: {
    flexDirection: "row"
  },
  shopCard: {
      backgroundColor: '#fdeff9',
      borderRadius: 10,
      width: '100%',
      padding: 15,
      shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  title: {
      color: 'rgba(100,0,100,0.8)',
      fontWeight: 'bold',
      fontSize: 19,
      textAlign: 'left',
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
  },
  section: {
      height: 40,
      width: 150,
      backgroundColor: '#9796f0',
      margin: 4,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  sectionText: {
    color: defaultStyles.colors.white
  }
});

export default ShopCard;
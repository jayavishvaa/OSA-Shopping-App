import React from 'react';
import { FlatList, StyleSheet, View, Image } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

import defaultStyles from '../config/styles';
import Text from '../components/Text';
import {} from 'react-native-paper';

function ShopCard({shopName, description, sectionData, address, pinCode}) {
  return(
    <View>
      <View style={styles.container}>
        <View style={styles.shopCard}>
            <View style={styles.rowFlex}>
                {/* <Fontisto
                    name="shopping-store"
                    style={{ top: '5%', marginRight: 10 }}
                    size={60}
                    color="gray"
                /> */}
                <Image
                    source={require('../assets/MyShop.png')}
                    style={{width:"40%",height:'100%',alignSelf:'center'}}
                />
                <View style={{ width: "70%",marginLeft:'5%' }}>
                  <Text style={styles.title}>{shopName}</Text>
                  {description !== "" && <Text style={styles.description}>{description}</Text>}
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
      {/* <View style={styles.cardsWrapper}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}> 
              <Image
                source={require('../assets/MyShop.png')}
                resizeMode="cover"
                style={styles.cardImg}
              />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Amazing...</Text>
          </View>
        </View>
      </View> */}
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
    flexDirection: "row",
    width:'90%'
  },
  shopCard: {
      backgroundColor: '#fffacd',
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
      textShadowColor: 'black',
      marginLeft:'2%',
      textShadowOffset: {
          width: 0, height: 1
      },
  },
  description: {
      fontSize: 17,
      color: defaultStyles.colors.medium,
      marginLeft:'2%'
  },
  sections: {
    flexDirection: 'row',
  },
  section: {
      height: 40,
      width: 150,
      backgroundColor: 'rgba(100,0,100,0.8)',
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
  },
  cardsWrapper: {
    marginTop:'2%',
    width:'100%',
    alignSelf:'center',
  },
  card: {
    height:100,
    marginVertical:10,
    flexDirection:'row',
    shadowColor:'#999',
    shadowOffset: {width:0 , height:1},
    shadowOpacity: 0.8,
    shadowRadius:2,
    elevation:5
  },
  cardImgWrapper: {
    flex:1
  },
  cardImg: {
    height:'100%',
    width:'100%',
    alignSelf:'center',
    borderRadius:8,
    borderBottomRightRadius:0,
    borderTopRightRadius:0
  },
  cardInfo: {
    flex:2,
    padding:10,
    borderColor: '#ccc',
    borderWidth:1,
    borderLeftWidth:0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor:'#fff'
  },
  cardTitle: {
    fontWeight:'bold'
  },
  cardDetails: {
    fontSize:12,
    color:'#444'
  }
});

export default ShopCard;
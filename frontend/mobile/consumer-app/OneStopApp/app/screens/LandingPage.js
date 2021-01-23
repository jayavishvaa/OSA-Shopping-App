import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import Text from '../components/Text';
import Screen from '../components/Screen';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import shopsApi from '../api/shops';
import routes from '../navigation/routes';

function LandingPage({ navigation }) {
    const [error, setError] = useState(false);

    const handlePressSection = async apiEndPoint => {
        const result = await shopsApi.shops(apiEndPoint);
        if (!result.ok) return setError(true);
        setError(false);
        navigation.navigate(routes.SHOPS);
        console.log(result);
    }
  return(
  <Screen>
      <Header/>
      <SearchBar/>
      {error && <Text>Unexpected error occured, please check your network connections or try again after sometime...</Text>}
      <View style={styles.sectionContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
        <TouchableOpacity style={styles.grocery} onPress={() => handlePressSection('grocery')}>
            <Image resizeMode="contain" style={styles.groceryImage} source={require('../assets/sections/grocery.png')}/>
            <Text>Grocery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.salon} onPress={() => handlePressSection('salon')}>
            <Image resizeMode="contain" style={styles.salonImage} source={require('../assets/sections/salon.png')}/>
            <Text>Salon</Text>
        </TouchableOpacity>
          </View>
          <View style={styles.row}>
        <TouchableOpacity style={styles.grocery} onPress={() => handlePressSection('medical')}>
            <Image resizeMode="contain" style={styles.groceryImage} source={require('../assets/sections/medical.png')}/>
            <Text>Medical</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.salon} onPress={() => handlePressSection('repairs')}>
            <Image resizeMode="contain" style={styles.salonImage} source={require('../assets/sections/repairs.png')}/>
            <Text>Repairs</Text>
        </TouchableOpacity>
          </View>
          <View style={styles.row}>
        <TouchableOpacity style={styles.grocery} onPress={() => handlePressSection('electronics')}>
            <Image resizeMode="contain" style={styles.groceryImage} source={require('../assets/sections/electronics.png')}/>
            <Text>Electronics &</Text>
            <Text>Computers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.salon} onPress={() => handlePressSection('freelancing')}>
            <Image resizeMode="contain" style={styles.salonImage} source={require('../assets/sections/freelancing.png')}/>
            <Text>Freelancing &</Text>
            <Text>JobSearch</Text>
        </TouchableOpacity>
          </View>

          <View style={styles.row}>
        <TouchableOpacity style={styles.grocery} onPress={() => handlePressSection('grocery')}>
            <Image resizeMode="contain" style={styles.groceryImage} source={require('../assets/sections/grocery.png')}/>
            <Text>Grocery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.salon} onPress={() => handlePressSection('salon')}>
            <Image resizeMode="contain" style={styles.salonImage} source={require('../assets/sections/salon.png')}/>
            <Text>Salon</Text>
        </TouchableOpacity>
          </View>
          <View style={styles.row}>
        <TouchableOpacity style={styles.grocery} onPress={() => handlePressSection('medical')}>
            <Image resizeMode="contain" style={styles.groceryImage} source={require('../assets/sections/medical.png')}/>
            <Text>Medical</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.salon} onPress={() => handlePressSection('repairs')}>
            <Image resizeMode="contain" style={styles.salonImage} source={require('../assets/sections/repairs.png')}/>
            <Text>Repairs</Text>
        </TouchableOpacity>
          </View>
          <View style={styles.row}>
        <TouchableOpacity style={styles.grocery} onPress={() => handlePressSection('electronics')}>
            <Image resizeMode="contain" style={styles.groceryImage} source={require('../assets/sections/electronics.png')}/>
            <Text>Electronics &</Text>
            <Text>Computers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.salon} onPress={() => handlePressSection('freelancing')}>
            <Image resizeMode="contain" style={styles.salonImage} source={require('../assets/sections/freelancing.png')}/>
            <Text>Freelancing &</Text>
            <Text>JobSearch</Text>
        </TouchableOpacity>
          </View>
      </ScrollView>
      </View>
  </Screen>);
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
  },
  sectionContainer: {
      height: '89%',
      margin: 2,
  },
  grocery: {
    alignItems: 'center'
  },
  groceryImage: {
    height: 150,
    width: 150,
    top: '5%',
    left: '8%',
    resizeMode: 'contain'
  },
  row: {
      flexDirection: 'row',
      marginVertical: 10
  },
  salon: {
      alignSelf: 'flex-end',
      alignItems: 'center',
      position: 'absolute',
      right: '8%',
  },
  salonImage: {
      height: 150,
      width: 150,
      resizeMode: 'contain',
  },
});

export default LandingPage;
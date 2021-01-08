import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import Text from '../components/Text';
import Screen from '../components/Screen';
import shopsApi from '../api/shops';
import authStorage from '../auth/storage';

function LandingPage(props) {
    const [error, setError] = useState(false);

    const handlePressSection = async apiEndPoint => {
        const { pinCode } = await authStorage.getUser();
        const data = { pinCode, apiEndPoint };
        console.log(data);
        const result = await shopsApi.shops(data);
        if (!result.ok) return setError(true);
        setError(false);
        console.log(result);
    }
  return(
  <Screen>
      {error && <Text>Unexpected error occured, please check your network connections or try again after sometime...</Text>}
      <View style={styles.container}><Text>Search Box</Text>
      <View style={styles.sectionContainer}>
      <ScrollView>
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
      </View>
  </Screen>);
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
  },
  sectionContainer: {
      height: '100%',
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
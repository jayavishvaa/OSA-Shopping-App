import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Screen from '../components/Screen';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import routes from '../navigation/routes';

function NoItem({ route, navigation }) {
  return(
      <Screen>
          {/* <Header/> */}
          <View style={styles.container}>
            {/* <FontAwesome5 name="box-open" size={120} color="rgba(0,0,0,0.5)" /> */}
            <Image
              source={require('../assets/AddItem.png')}
              style={{width:"90%",height:'50%',marginBottom:'5%'}}
            />
            <Text style={{
                color: 'gray',
                textAlign: 'center',
                marginVertical: 4
            }}>You have not created any item here, create it here</Text>
            {/* <Button title="Create items" onPress={() => navigation.navigate(routes.ADDITEM, {
                categoryName: route.params.categoryName
            })}/> */}
             <Button title="Create items" onPress={() => navigation.navigate(routes.ADDITEM)}/>
          </View>
      </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: '4%',
  }
});

export default NoItem;
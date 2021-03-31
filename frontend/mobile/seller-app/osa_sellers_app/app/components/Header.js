import  React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Entypo, MaterialIcons,SimpleLineIcons  } from '@expo/vector-icons';
import Text from './Text';
import defaultStyles from '../config/styles';
import {Appbar} from 'react-native-paper';
import routes from '../navigation/routes';
import Screen from './Screen';
import { useNavigation} from '@react-navigation/native';


function Header() {
  const navigation = useNavigation();
  return(
        <Appbar.Header style={{justifyContent:'center',alignItems:'center',height:'7%',backgroundColor:'#2ccce4'}}>
          <TouchableOpacity style={{marginLeft:'2%',display:'flex',flexDirection:'row'}} onPress={() => navigation.navigate(routes.HOME)} >
            <SimpleLineIcons name="home" size={24} color="black" />
          </TouchableOpacity>
          <Appbar.Content title="OneStopApp" color="black"  style={{justifyContent:'center',alignItems:'center',marginTop:'4%',marginRight:'6%'}} />
          <TouchableOpacity  onPress={() => navigation.openDrawer()}>
            <Entypo name="menu" size={30} color="black" />
          </TouchableOpacity>
        </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  container:{
      alignItems: 'center',
      backgroundColor: 'rgba(255,99,71,0.9)',
      paddingBottom: 5
  },
  
  name: {
    fontSize: 25,
    color: 'white',
    marginRight:'28%'
  },
  top: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    padding: 5
  },
  home: {
    flex:1,
    justifyContent:'center'
  },
  menu: {
    justifyContent:'center'
  }
});

export default Header;
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
    MaterialIcons,
    Ionicons,
    Entypo,
    FontAwesome,
    MaterialCommunityIcons
} from '@expo/vector-icons';

import {
    Avatar,
    Title,
    Caption
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Text from '../components/Text';
import Screen from '../components/Screen';
import defaultStyles from '../config/styles';
import useAuth from '../auth/useAuth';
import usersApi from '../api/users';
import routes from '../navigation/routes';
import Header from '../components/Header';

function Account(props) {
    const auth = useAuth();
    const [user, setUser] = useState([]);
    const [gettingInfo, setGettingInfo] = useState(false);
    const [error, setError] = useState(false);
    const getUserApi = async () => {
        setGettingInfo(true);
        const result = await usersApi.get(auth.user._id);
        if (!result.ok) {
            setError(true);
            setGettingInfo(false);
            return;
        }
        setError(false);
        setUser(result.data);
        setGettingInfo(false);
    };

    useEffect(() => {
        getUserApi();
    }, []);

    const handleLogOut = () => {
        auth.logOut();
    }
    const handleEditUsersInfo = () => {
        
    }

  return(
      <Screen>
          <Header/>
          <View style={styles.container}>
              {error && <Text style={{
                  textAlign: 'center',
                  color: 'red'
              }}>Couldn't talk to the server, it will come soon</Text>}
              <View style={styles.userContainer}>
                <View style={styles.userInfo}>
                  <Avatar.Image
                      source={{
                        uri:'data:image/jpeg;base64,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'
                    }}
                      size={105}
                  />
                  {gettingInfo && <Text style={{
                      textAlign: 'center',
                      color: 'rgba(0,0,0,0.5)'
                  }}>Getting User...</Text>}
                  {!gettingInfo && user && <View style={styles.userDetails}>
                      <Title style={styles.detail}>{user.fullName}</Title>
                      <Caption style={styles.detail}>{user.landmark === '' ? `${user.homeAddress}` : `Near ${user.landmark}, ${user.homeAddress}`}</Caption>
                      <Caption style={styles.detail}>{user.pinCode}</Caption>
                      {/* <Caption style={styles.subDetail}>{user.phoneNumber}</Caption> */}
                  </View>}
                  {!user && <Text style={{ color: 'red' }}>Server Error</Text>}
                  <TouchableOpacity style={styles.editIcon} onPress={handleEditUsersInfo}>
                    <MaterialCommunityIcons
                        name="account-edit"
                        size={27}
                        color='rgba(0,0,0,0.5)'                      
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginBottom:'3%',marginLeft:"5%"}}>
                  {gettingInfo && <Text style={{
                        textAlign: 'center',
                        color: 'rgba(0,0,0,0.5)'
                    }}>Getting User...</Text>}
                    {!gettingInfo && user && <View style={styles.userDetails}>
                        <View style={{flexDirection:'row',alignItems:'center',marginBottom:'2%'}}>
                          <Icon name="phone" size={20} style={{marginRight:'2%'}} color="#777777"/>
                          <Text style={styles.subDetail}>{user.phoneNumber}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Icon name="map-marker-radius" size={20} style={{marginRight:'2%'}} color="#777777"/>
                          <Text style={styles.subDetail}>{user.city}</Text>
                        </View>
                  </View>}
                </View>
              </View>
              <View style={styles.accountOptions}>
                  <TouchableOpacity style={styles.menu}>
                    <Ionicons name="settings-outline" size={25} color='#FF6347' />
                    <Text style={styles.menuText}>Settings</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menu}>
                  <Ionicons name="help-circle-outline" size={25} color='#FF6347' />
                    <Text style={styles.menuText}>Help and feedback</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menu}>
                  <Entypo name="google-play" size={25} color='#FF6347' />
                    <Text style={styles.menuText}>Rate us</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menu} onPress={handleLogOut}>
                  <MaterialIcons name="logout" size={25} color='#FF6347' />
                    <Text style={styles.menuText}>Log Out</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
  },
  detail: {
      color: 'rgba(0,0,0,0.6)',
  },
  editIcon: {
    position: 'absolute',
    right: 8,
    top: 5
  },
  accountOptions: {
    marginTop:'2%'
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '8%',
    marginBottom:'2%',
    marginTop:'4%'
  },
  menuText: {
    marginLeft: 20,
    fontSize: 15,
    color: 'gray'
  },
  subDetail: {
    color:'black',
    marginLeft:'2%',
    fontSize:15
  },
  userContainer: {
    flexDirection:'column',
    borderBottomWidth:2,
    borderBottomColor:'rgba(0,0,0,0.2)',
  },
  userInfo: {
      flexDirection: 'row',
      margin: 15,
      alignItems: 'center'
  },
  userDetails: {
      marginLeft: '5%',
  }
});

export default Account;
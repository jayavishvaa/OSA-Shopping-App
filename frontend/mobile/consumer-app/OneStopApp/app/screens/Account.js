import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Entypo,
    FontAwesome
} from '@expo/vector-icons';

import Text from '../components/Text';
import Header from '../components/Header';
import Screen from '../components/Screen';
import defaultStyles from '../config/styles';
import useApi from '../hooks/useApi';
import useAuth from '../auth/useAuth';
import usersApi from '../api/users';

function Account(props) {
    const auth = useAuth();
    const [user, setUser] = useState([]);
    const [error, setError] = useState(false);
    const getUserApi = async () => {
        console.log(auth.user);
        const result = await usersApi.get(auth.user._id);
        console.log(result);
        if (!result.ok) return setError(true);
        setError(false);
        setUser(result.data);
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
              <View style={styles.userInfo}>
                <MaterialCommunityIcons
                    name="account-circle"
                    size={105}
                    color='rgba(0,0,0,0.3)'
                />
                {user && <View style={styles.userDetails}>
                    <Text style={styles.detail}>{user.fullName}</Text>
                    <Text style={styles.subDetail}>{user.landmark === '' ? `${user.homeAddress}` : `Near ${user.landmark}, ${user.homeAddress}`}</Text>
                    <Text style={styles.subDetail}>{user.pinCode}</Text>
                    <Text style={styles.subDetail}>{user.phoneNumber}</Text>
                </View>}
                {!user && <Text style={{ color: 'red' }}>Server Error</Text>}
                <MaterialIcons
                    name="edit"
                    size={24}
                    style={styles.editIcon}
                    color='rgba(0,0,0,0.5)'
                    onPress={handleEditUsersInfo}
                />
              </View>
              <View style={styles.accountOptions}>
                  <TouchableOpacity style={styles.menu}>
                  <FontAwesome
                    name="rupee"
                    // onPress={handleCredits}
                    style={{ marginLeft: 9, width: 30 }}
                    size={40}
                    color='rgba(0,0,0,0.5)'
                  />
                    <Text style={styles.menuText}>Credits</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menu}>
                    <MaterialCommunityIcons name="order-bool-ascending-variant" size={40} color='rgba(0,0,0,0.5)' />
                    <Text style={styles.menuText}>Orders</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menu}>
                    <Ionicons name="settings-sharp" size={40} color='rgba(0,0,0,0.5)' />
                    <Text style={styles.menuText}>Settings</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menu}>
                  <Ionicons name="md-help-circle" size={40} color='rgba(0,0,0,0.5)' />
                    <Text style={styles.menuText}>Help and feedback</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menu}>
                  <Entypo name="google-play" size={40} color='rgba(0,0,0,0.5)' />
                    <Text style={styles.menuText}>Rate us</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menu} onPress={handleLogOut}>
                  <Entypo name="log-out" size={40} color='rgba(0,0,0,0.5)' />
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
      color: defaultStyles.colors.font
  },
  editIcon: {
    position: 'absolute',
    right: 8,
    top: 5
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '5%',
    marginLeft: '8%',
  },
  menuText: {
    marginLeft: 20,
    fontSize: 21,
    color: defaultStyles.colors.font
  },
  subDetail: {
    color: defaultStyles.colors.fontSecondary,
  },
  userInfo: {
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: defaultStyles.colors.primary,
      margin: 15,
      paddingBottom: 10,
      alignItems: 'center'
  },
  userDetails: {
      marginLeft: 5,
      width: '55%'
  }
});

export default Account;
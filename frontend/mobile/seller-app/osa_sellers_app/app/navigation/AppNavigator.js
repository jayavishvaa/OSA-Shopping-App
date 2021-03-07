import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
    Entypo,
    FontAwesome5,
} from '@expo/vector-icons';

import ShopNavigator from './ShopNavigator';
import MyOrders from '../screens/MyOrders';
import Account from '../screens/Account'
import routes from './routes';
import { DrawerContent } from '../components/DrawerContent';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
      <Tab.Navigator
        initialRouteName={routes.SHOPNAVIGATOR}
        activeColor="#ffff00"
        inactiveColor="#fff"
        labeled={false}
        barStyle={{ backgroundColor:'#d2691e' }}
        // screenOptions={({ route }) => ({
        //   tabBarIcon: ({ focused, color, size }) => {
        //       const iconSize = 30;
        //     if (route.name == routes.SHOPNAVIGATOR) {
        //       return <Entypo name="shop" size={iconSize} color={color} />;
        //     } else if (route.name === routes.MYORDERS) {
        //         return <FontAwesome5 name="tasks" size={iconSize} color={color} />
        //     } else if (route.name === routes.ACCOUNT) {
        //         return <MaterialCommunityIcons name="account" size={iconSize} color={color} />
        //     } 
        //   },
        // })}
        // tabBarOptions={{
        //   activeTintColor: 'tomato',
        //   inactiveTintColor: 'gray',
        //   showLabel: false,
        //   activeBackgroundColor: 'rgba(0,0,0,0.07)',
        //   style: { height: '8%' },
        //   keyboardHidesTabBar: true
        // }}
      >
        <Tab.Screen 
          name={routes.SHOPNAVIGATOR} 
          component={ShopNavigator}
          options={{
            tabBarLabel: 'home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen 
          name={routes.MYORDERS} 
          component={MyOrders} 
          options={{
            tabBarLabel: 'Myorders',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="tasks" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name={routes.ACCOUNT} 
          component={Account} 
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => ( 
              <MaterialCommunityIcons name="account" color={color} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

export default function NavigationApp () {
  return (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
          <Drawer.Screen name={routes.MYSHOP} children={App}/>
          <Drawer.Screen name={routes.ACCOUNT} component={Account}/>
          <Drawer.Screen name={routes.MYORDERS} component={MyOrders}/>
        </Drawer.Navigator>
  )
};
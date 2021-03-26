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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddProduct from '../screens/AddProduct';
import Dues from '../screens/Dues';
import Notification from '../screens/Notification';

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
      <Tab.Navigator
        initialRouteName={routes.SHOPNAVIGATOR}
        activeColor="#ffff00"
        inactiveColor="#fff"
        labeled={true}
        barStyle={{ backgroundColor:'#d2691e',borderTopColor:'transparent'}}
        // sceneAnimationEnabled={true}
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
            tabBarBadge: 3,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={27} />
            ),
          }}
        />
        <Tab.Screen 
          name={routes.ADDPRODUCT} 
          component={AddProduct} 
          options={{
            tabBarLabel: 'AddProduct',
            
            tabBarIcon: ({ color }) => (
              <Ionicons name="add-circle-sharp" size={27} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name={routes.DUES} 
          component={Dues} 
          options={{
            tabBarLabel: 'Dues',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="tasks" size={27} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name={routes.NOTIFICATION} 
          component={Notification} 
          options={{
            tabBarLabel: 'Notification',
            tabBarBadge: 3,
            tabBarIcon: ({ color }) => ( 
              <Ionicons name="notifications" color={color} size={27} />
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
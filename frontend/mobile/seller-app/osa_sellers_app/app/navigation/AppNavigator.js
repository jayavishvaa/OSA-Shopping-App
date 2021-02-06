import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    Entypo,
    FontAwesome5,
    MaterialCommunityIcons
} from '@expo/vector-icons';

import ShopNavigator from './ShopNavigator';
import MyOrders from '../screens/MyOrders';
import Account from '../screens/Account'
import routes from './routes';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
              const iconSize = 30;
            if (route.name == routes.SHOPNAVIGATOR) {
              return <Entypo name="shop" size={iconSize} color={color} />;
            } else if (route.name === routes.MYORDERS) {
                return <FontAwesome5 name="tasks" size={iconSize} color={color} />
            } else if (route.name === routes.ACCOUNT) {
                return <MaterialCommunityIcons name="account" size={iconSize} color={color} />
            } 
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          showLabel: false,
          activeBackgroundColor: 'rgba(0,0,0,0.07)',
          style: { height: '8%' },
          keyboardHidesTabBar: true
        }}
      >
        <Tab.Screen name={routes.SHOPNAVIGATOR} component={ShopNavigator} />
        <Tab.Screen name={routes.MYORDERS} component={MyOrders} />
        <Tab.Screen name={routes.ACCOUNT} component={Account} />
      </Tab.Navigator>
  );
}
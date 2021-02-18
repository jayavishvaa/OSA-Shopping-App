import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppNavigator from './AppNavigator';
import LandingPage from '../screens/LandingPage';
import Shops from '../screens/Shops';
import Categories from '../screens/Categories';
import ShopItems from '../screens/ShopItems';
import CartItems from '../screens/CartItems';
import routes from './routes';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
    <Stack.Screen name={routes.APPNAVIGATOR} component={AppNavigator} />
    <Stack.Screen name={routes.SHOPS} component={Shops} />
    <Stack.Screen name={routes.CATEGORIES} component={Categories} />
    <Stack.Screen name={routes.SHOPITEMS} component={ShopItems} />
    <Stack.Screen name={routes.CARTITEMS} component={CartItems} />
  </Stack.Navigator>
);

export default AuthNavigator;
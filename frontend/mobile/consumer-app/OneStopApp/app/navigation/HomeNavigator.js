import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LandingPage from '../screens/LandingPage';
import Shops from '../screens/Shops';
import CategoriesAndItems from '../screens/CategoriesAndItems';
import routes from './routes';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.LANDINGPAGE} component={LandingPage} />
    <Stack.Screen name={routes.SHOPS} component={Shops} />
    <Stack.Screen name={routes.CATEGORIESANDITEMS} component={CategoriesAndItems} />
  </Stack.Navigator>
);

export default AuthNavigator;
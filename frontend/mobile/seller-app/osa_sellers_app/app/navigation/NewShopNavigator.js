import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NoShop from '../screens/NoShop';
import CreateShop from '../screens/CreateShop';
import routes from './routes';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.NOSHOP} component={NoShop} />
    <Stack.Screen name={routes.CREATESHOP} component={CreateShop} />
  </Stack.Navigator>
);

export default AccountNavigator;
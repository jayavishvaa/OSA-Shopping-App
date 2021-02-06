import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NotRegistered from '../screens/NotRegistered';
import Register from '../screens/Register';
import routes from './routes';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
        name={routes.NOTREGISTER}
        component={NotRegistered}
        options={{ headerShown: false }}
    />
    <Stack.Screen name={routes.REGISTER} component={Register} />
  </Stack.Navigator>
);

export default AccountNavigator;
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NotRegistered from '../screens/NotRegistered';
import Register from '../screens/Register';
import routes from './routes';
import BussinessDetails from '../screens/BussinessDetails';
import BankDetails from '../screens/BankDetails';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
        name={routes.NOTREGISTER}
        component={NotRegistered}
        options={{ headerShown: false }}
    />
    <Stack.Screen name={routes.REGISTER} component={Register} />
    <Stack.Screen name={routes.BUSSINESSDETAILS} component={BussinessDetails} />
    <Stack.Screen name={routes.BANKDETAILS} component={BankDetails} />
  </Stack.Navigator>
);

export default AccountNavigator;
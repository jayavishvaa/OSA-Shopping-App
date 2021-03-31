import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NavigationApp from '../navigation/AppNavigator';
import NotRegistered from '../screens/NotRegistered';
import Register from '../screens/Register';
import routes from './routes';
import BussinessDetails from '../screens/BussinessDetails';
import BankDetails from '../screens/BankDetails';
import CreateShop from '../screens/CreateShop';
import AddItem from '../screens/AddItem';
import MyShop from '../screens/MyShop';
import NoItem from '../screens/NoItem';

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2ccce4'
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        marginLeft:'24%'
      },
      title:'OneStopApp'
    }}
  >
    <Stack.Screen
        name={routes.NOTREGISTER}
        component={NotRegistered}
        options={{ headerShown: false }}
    />
    <Stack.Screen name={routes.NAVIGATIONAPP} component={NavigationApp} options={{ headerShown: false}}/>
    <Stack.Screen name={routes.REGISTER} component={Register} />
    <Stack.Screen name={routes.BUSSINESSDETAILS} component={BussinessDetails} />
    <Stack.Screen name={routes.BANKDETAILS} component={BankDetails} />
    <Stack.Screen name={routes.CREATESHOP} component={CreateShop} />
  </Stack.Navigator>
);

export default AccountNavigator;
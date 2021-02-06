import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MyShop from '../screens/MyShop';
import NoShop from "../screens/NoShop";
import CreateShop from "../screens/CreateShop";
import NoCategories from '../screens/NoCategories';
import MyCategories from '../screens/MyCategories';
import AddCategory from '../screens/AddCategory';
import NoItem from "../screens/NoItem";
import MyItems from '../screens/MyItems';
import AddItem from "../screens/AddItem";
import routes from './routes';

const Stack = createStackNavigator();

const ShopNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.MYSHOP} component={MyShop} />
    <Stack.Screen name={routes.NOSHOP} component={NoShop} />
    <Stack.Screen name={routes.CREATESHOP} component={CreateShop} />
    <Stack.Screen name={routes.NOCATEGORIES} component={NoCategories} />
    <Stack.Screen name={routes.MYCATEGORIES} component={MyCategories} />
    <Stack.Screen name={routes.ADDCATEGORY} component={AddCategory} />
    <Stack.Screen name={routes.MYITEMS} component={MyItems} />
    <Stack.Screen name={routes.NOITEMS} component={NoItem} />
    <Stack.Screen name={routes.ADDITEM} component={AddItem} />
  </Stack.Navigator>
);

export default ShopNavigator;
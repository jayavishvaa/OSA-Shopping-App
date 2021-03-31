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
import MyOrders from '../screens/MyOrders';
import AddProduct from '../screens/AddProduct';
import Home from '../screens/Home';
import NewOrders from '../screens/newOrders';

const Stack = createStackNavigator();


const ShopNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.HOME} component={Home} />
    <Stack.Screen name={routes.ADDPRODUCT} component={AddProduct} />
    <Stack.Screen name={routes.MYSHOP} component={MyShop} />
    <Stack.Screen name={routes.NEWORDERS} component={NewOrders} />
    <Stack.Screen name={routes.NOSHOP} component={NoShop} />
    <Stack.Screen name={routes.NOCATEGORIES} component={NoCategories} />
    <Stack.Screen name={routes.ADDCATEGORY} component={AddCategory} />
    <Stack.Screen name={routes.MYCATEGORIES} component={MyCategories} />
    <Stack.Screen name={routes.NOITEMS} component={NoItem} />
    <Stack.Screen name={routes.ADDITEM} component={AddItem} />
    <Stack.Screen name={routes.MYITEMS} component={MyItems} />
    <Stack.Screen name={routes.MYORDERS} component={MyOrders} />
  </Stack.Navigator>
);

export default ShopNavigator;
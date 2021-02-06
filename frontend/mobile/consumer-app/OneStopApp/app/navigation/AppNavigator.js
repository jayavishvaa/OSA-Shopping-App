import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Entypo } from '@expo/vector-icons';

import LandingPage from '../screens/LandingPage';
import Account from '../screens/Account';
import WhisList from '../screens/WhisList';
import Offers from '../screens/Offers';
import routes from './routes';
import defaultStyles from '../config/styles';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          color = focused ? defaultStyles.colors.font : 'rgba(0,0,0,0.4)';
          size = focused ? 35 : 32;
          
          if (route.name === routes.LANDINGPAGE) {
             return <Entypo name="home" size={size} color={color} />
            } else if (route.name === routes.ACCOUNT) {
                iconName = 'user';
            } else if (route.name === routes.WHISLIST) {
                iconName = 'shopping-bag';
                size = focused ? 32 : 28;
          } else if (route.name === routes.OFFERS) {
              iconName = 'gift';
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })} 
      tabBarOptions={{
        showLabel: false,
        tabStyle: {
            backgroundColor: defaultStyles.colors.primary,
        },
        style: {
            height: 60
        },
        keyboardHidesTabBar: true,
      }}
      >
        <Tab.Screen name={routes.LANDINGPAGE} component={LandingPage} />
        <Tab.Screen name={routes.ACCOUNT} component={Account} />
        <Tab.Screen name={routes.WHISLIST} component={WhisList} />
        <Tab.Screen name={routes.OFFERS} component={Offers} />
      </Tab.Navigator>
  );
}
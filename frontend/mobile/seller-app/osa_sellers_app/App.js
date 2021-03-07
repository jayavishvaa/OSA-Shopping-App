import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import navigationTheme from "./app/navigation/navigationTheme";
// import OfflineNotice from "./app/components/OfflineNotice";
import Login from './app/screens/Login';
import NewUserNavigator from './app/navigation/NewUserNavigator';
import NavigationApp from './app/navigation/AppNavigator';
import LandingPage from './app/screens/LandingPage';
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import jwtDecode from "jwt-decode";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {/* <OfflineNotice /> */}
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? user.pinCode === '000000' ? <NewUserNavigator/> : <NavigationApp/> : <Login />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
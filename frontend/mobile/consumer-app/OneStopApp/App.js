import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";

import navigationTheme from "./app/navigation/navigationTheme";
import HomeNavigator from "./app/navigation/HomeNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import Login from './app/screens/Login';
import NewUserNavigator from './app/navigation/NewUserNavigator';
import LandingPage from './app/screens/LandingPage';
import Shops from './app/screens/Shops';
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
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? user.pinCode === '000000' ? <NewUserNavigator/> : <HomeNavigator /> : <Login />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// export default function App() {
//   async function test() {
//     const result = await authStorage.storeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY2ODk0N2ViYjc1MDU4NzM2N2RmMDAiLCJwaG9uZU51bWJlciI6Ijg2NzQ5OTYyNDkiLCJyb2xlcyI6ImN1c3RvbWVyIiwicGluQ29kZSI6IjAwMDAwMCIsImlhdCI6MTYxMDAyOTQxOH0.ojpTXagUBdJWspH7DNKlvoENFr-QX9rT2KT5uXho73s');
//     console.log(result);
//     const user = jwtDecode(await authStorage.getToken());
//     console.log(user);
//     await authStorage.removeToken();
//   }
//   test();
//   return (<></>)
// }


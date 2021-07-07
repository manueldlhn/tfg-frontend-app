import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import navigationTheme from './app/navigation/navigationTheme';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';

export default function App() {

  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if(!token) return;
    setUser(await authStorage.getUser());
  }
  // Se puede quitar sin problema
  if(!isReady)
    return (<AppLoading startAsync={ restoreToken } onFinish={() => setIsReady(true)} onError={console.log("Error en AppLoading")}/>);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator user={user}/> :  <AuthNavigator /> }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

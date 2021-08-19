/* ---------------------------
 *    Nombre del fichero: App.js
 *    Descripción: Este es el fichero principal de la app.        
 *    Contenido: 
 *        - App: Función "main" de la aplicación.       
 * ---------------------------  
 */

import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import navigationTheme from './app/navigation/navigationTheme';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';



/* --------------------------
 *    Nombre de la Función: App
 *    Funcionamiento: Define el funcionamiento general de la App, implementando los navigators.
 *    Argumentos que recibe: Ninguno
 *    Devuelve: La aplicación en sí.
 * --------------------------
 */

export default function App() {
  // Controlamos el usuario con un hook
  const [user, setUser] = useState();

  const [isReady, setIsReady] = useState(false);

  /* --------------------------
  *    Nombre de la Función: restoreToken
  *    Funcionamiento: Obtiene el Token y el Usuario de authStorage
  *    Argumentos que recibe: Ninguno
  *    Devuelve: Nada (void).
  * --------------------------
  */
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

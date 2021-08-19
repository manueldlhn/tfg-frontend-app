/* ---------------------------
 *    Nombre del fichero: AuthNavigator.js
 *    Descripción: Este fichero contiene el navegador del conjunto de vistas relacionadas con la autenticación.       
 *    Contenido: 
 *          - AuthNavigator: Función que define la estructura y el funcionamiento del navegador.       
 * ---------------------------  
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();


/* --------------------------
 *    Nombre de la Función: AuthNavigator
 *    Funcionamiento: Define la estructura del navegador de autenticación
 *    Argumentos que recibe: Ninguno.
 *    Devuelve: El navegador en sí.
 * --------------------------
 */
const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Iniciar Sesión" component={LoginScreen} />
        <Stack.Screen name="Registrarse" component={RegisterScreen} />
    </Stack.Navigator>
)

export default AuthNavigator;
/* ---------------------------
 *    Nombre del fichero: AccountNavigator.js
 *    Descripción: Este fichero contiene el Navigator del conjunto de vistas relacionadas con "Mi cuenta".        
 *    Contenido: 
 *          - AccountNavigator: Función que define la estructura del navegador.       
 * ---------------------------  
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';
import colors from '../config/colors';
import MyDetailsScreen from '../screens/MyDetailsScreen';
import WatchingLiveScreen from '../screens/WatchingLiveScreen';
import ListingRecordsScreen from '../screens/ListingRecordsScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();


/* --------------------------
 *    Nombre de la Función: AccountNavigator
 *    Funcionamiento: Define la estructura del navegador de "Mi cuenta".
 *    Argumentos que recibe: Ninguno.
 *    Devuelve: El navigator en sí.
 * --------------------------
 */
const AccountNavigator = () => (
    // Definimos el navigator
    <Stack.Navigator
        mode="modal"
    >
        {/* Con Stack.Screen se añaden todas las vistas que compondrán el navegador. */}
        <Stack.Screen 
            name="Yo" 
            component={AccountScreen}
            options={{
                headerShown:true,
                title: "Mi cuenta",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }} 
        />
        <Stack.Screen
            name="MyDetails"
            component={MyDetailsScreen}
            options={{
                headerShown:true,
                title: "Mis datos",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
                headerTitleAlign: 'center',
            }}
        />
        <Stack.Screen 
            name="WatchingLive"
            component={WatchingLiveScreen}
            options={{
                headerShown: true,
                title: "En Directo",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
                headerTitleAlign: 'center',
            }}
        />
        <Stack.Screen
            name="ListingRecords"
            component={ListingRecordsScreen}
            options={{
                headerShown:true,
                title: "Historial de Ejercicios",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
                headerTitleAlign: 'center',
            }}
        />
        <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{
                headerShown:true,
                title: "Acerca de",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
                headerTitleAlign: 'center',
            }}
        />

    </Stack.Navigator>
);

export default AccountNavigator;
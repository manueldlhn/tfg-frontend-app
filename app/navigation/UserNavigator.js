/* ---------------------------
 *    Nombre del fichero: UserNavigator.js
 *    Descripción: Este fichero contiene el Navigator del conjunto de vistas relacionadas con "Usuarios".        
 *    Contenido: 
 *          - UserNavigator: Función que define la estructura del navegador.       
 * ---------------------------  
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListingUsersScreen from '../screens/ListingUsersScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import colors from '../config/colors';
import ListingUserPerscriptionsScreen from '../screens/ListingUserPerscriptionsScreen';
import PrescriptionDetailsScreen from '../screens/PrescriptionDetailsScreen';
import PrescribeToUserScreen from '../screens/PrescribeToUserScreen';
import ListingRecordsScreen from '../screens/ListingRecordsScreen';


const Stack = createStackNavigator();


/* --------------------------
 *    Nombre de la Función: UserNavigator
 *    Funcionamiento: Define la estructura del navegador de "Usuarios".
 *    Argumentos que recibe: Ninguno.
 *    Devuelve: El navigator en sí.
 * --------------------------
 */
const UserNavigator = () => (
    // Definimos el navigator
    <Stack.Navigator
        mode="modal"
    >
        {/* Con Stack.Screen se añaden todas las vistas que compondrán el navigator. */}
        <Stack.Screen 
            name="ListingUsers" 
            component={ListingUsersScreen}
            options={{
                headerShown:true,
                title:"Usuarios",
                headerStyle: { backgroundColor: colors.primary},
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }} 
        />
        <Stack.Screen
            name="UserDetails"
            component={UserDetailsScreen}
            options={{
                headerShown:true, 
                title:"Detalles del Usuario",
                headerStyle: { backgroundColor: colors.primary},
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />
        <Stack.Screen
            name="ListingRecords"
            component={ListingRecordsScreen}
            options={{
                headerShown:true, 
                title:"Historial de Ejercicios",
                headerStyle: { backgroundColor: colors.primary},
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />
        <Stack.Screen
            name="ListingUserPrescriptions"
            component={ListingUserPerscriptionsScreen}
            options={{
                headerShown:true, 
                title:"Prescripciones del Usuario",
                headerStyle: { backgroundColor: colors.primary},
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />
        <Stack.Screen
            name="PrescriptionDetails"
            component={PrescriptionDetailsScreen}
            options={{
                headerShown:true, 
                title:"Detalles de la Prescripción",
                headerStyle: { backgroundColor: colors.primary},
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />
        <Stack.Screen
            name="PrescribeToUser"
            component={PrescribeToUserScreen}
            options={{
                headerShown:true, 
                title:"Prescripción",
                headerStyle: { backgroundColor: colors.primary},
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />
    </Stack.Navigator>
);

export default UserNavigator;
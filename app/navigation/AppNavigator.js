/* ---------------------------
 *    Nombre del fichero: AppNavigator.js
 *    Descripción: Este fichero contiene el navegador base de la app.        
 *    Contenido: 
 *          - Tab: Bottom Tab Navigator. Consiste en una barra de navegación
 *                 situada en la base de la pantalla que contendrá los botones
 *                 necesarios para moverse a lo largo de las diferentes partes
 *                 que componen la app. Consistirá en el navegador de navegadores.
 *          - getTabBarVisibility: Función que existe para eliminar la barra de
 *                                 la pantalla en la vista de usuario realizando
 *                                 un ejercicio.
 *          - AppNavigator: Función que define la estructura y el funcionamiento
 *                          de la barra de navegación.       
 * ---------------------------  
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


import AccountNavigator from './AccountNavigator';
import colors from '../config/colors';
import { StyleSheet } from 'react-native';
import RoutineNavigator from './RoutineNavigator';
import UserNavigator from './UserNavigator';
import WorkoutNavigator from './WorkoutNavigator';

const Tab = createBottomTabNavigator();


/* --------------------------
 *    Nombre de la Función: getTabBarVisibility
 *    Funcionamiento: Obtiene el nombre de la ruta de navegación y,
 *                    si es "DoingWorkout", desactiva la barra de navegación.
 *    Argumentos que recibe:
 *          - route: Ruta de navegación.
 *    Devuelve: False si la barra de navegación debe estar oculta. True si no.
 * --------------------------
 */
const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';

    if(routeName == "DoingWorkout")
        return false;
    return true;
};


/* --------------------------
 *    Nombre de la Función: AppNavigator
 *    Funcionamiento: Define la estructura y el funcionamiento de la
 *                    barra de navegación.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - user: Usuario de la app.
 *    Devuelve: La barra de navegación en sí.
 * --------------------------
 */
const AppNavigator = ({user}) => (
    // Definimos el navegador, con su ruta inicial.
    <Tab.Navigator
        tabBarOptions={{
            activeBackgroundColor: colors.primary,
            activeTintColor: colors.white,
            inactiveBackgroundColor: colors.primary,
            inactiveTintColor: colors.lightprimary,
            style: styles.tab,
        }}
        initialRouteName="Yo"
    >
        {/* Especificamos qué botones van a ser visibles según el rol del usuario */}
        {
            user.Rol == "Especialista" 
                &&
            <Tab.Screen
                name="Usuarios"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({size, color }) => <MaterialCommunityIcons name="account-box-multiple" size={size} color={color}/>
                }}
            />
        }
        
        <Tab.Screen
            name="Rutinas"
            component={RoutineNavigator} 
            options={({route}) => ({
                tabBarIcon: ({size, color}) => <MaterialCommunityIcons name="text-box-multiple" size={size} color={color}/>,
                tabBarVisible: getTabBarVisibility(route),
            })}
        />
        <Tab.Screen
            name="Ejercicios"
            component={WorkoutNavigator}
            options={({route}) => ({
                tabBarIcon: ({size, color}) => <MaterialCommunityIcons name="karate" size={size} color={color}/>,
                tabBarVisible: getTabBarVisibility(route), 
            }) }
        />
        <Tab.Screen
            name="Yo"
            component={AccountNavigator} 
            options={{
                tabBarIcon: ({size, color}) => <MaterialCommunityIcons name="account" size={size} color={color}/>
            }}
        />
    </Tab.Navigator>
);

const styles = StyleSheet.create({
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: colors.primary
    }
})

export default AppNavigator;
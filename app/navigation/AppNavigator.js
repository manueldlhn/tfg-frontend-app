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

const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';

    if(routeName == "DoingWorkout")
        return false;
    return true;
}

const AppNavigator = ({user}) => (
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
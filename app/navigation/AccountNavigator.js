import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';
import colors from '../config/colors';
import MyDetailsScreen from '../screens/MyDetailsScreen';
import WatchingLiveScreen from '../screens/WatchingLiveScreen';
import ListingRecordsScreen from '../screens/ListingRecordsScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();



const AccountNavigator = () => (
    <Stack.Navigator
        mode="modal"
    >
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
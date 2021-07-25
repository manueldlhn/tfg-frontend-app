import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';
import colors from '../config/colors';
import MyDetailsScreen from '../screens/MyDetailsScreen';
import ListingAssociationsScreen from '../screens/ListingAssociationsScreen';
import AssociationDetailsScreen from '../screens/AssociationDetailsScreen';
import AssociateScreen from '../screens/AssociateScreen';
import WatchingLiveScreen from '../screens/WatchingLiveScreen';

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
            name="ListingAssociations"
            component={ListingAssociationsScreen}
            options={{
                headerShown:true,
                title: "Asociaciones",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
                headerTitleAlign: 'center',
            }}
        />
        <Stack.Screen
            name="AssociationDetails"
            component={AssociationDetailsScreen}
            options={{
                headerShown:true,
                title: "Detalles de la Asociación",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
                headerTitleAlign: 'center',
            }}
        />
        <Stack.Screen
            name="Associate"
            component={AssociateScreen}
            options={{
                headerShown:true,
                title: "Modificar Asociación",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
                headerTitleAlign: 'center',
            }}
        />

    </Stack.Navigator>
);

export default AccountNavigator;
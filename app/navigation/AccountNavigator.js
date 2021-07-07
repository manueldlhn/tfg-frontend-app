import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';
import colors from '../config/colors';
import MyDetailsScreen from '../screens/MyDetailsScreen';

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

    </Stack.Navigator>
);

export default AccountNavigator;
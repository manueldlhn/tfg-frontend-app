import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListingUsersScreen from '../screens/ListingUsersScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import colors from '../config/colors';


const Stack = createStackNavigator();

const UserNavigator = () => (
    <Stack.Navigator
        mode="modal"
    >
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

    </Stack.Navigator>
);

export default UserNavigator;
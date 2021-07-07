import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListingUsersScreen from '../screens/ListingUsersScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import colors from '../config/colors';
import ListingUserPerscriptionsScreen from '../screens/ListingUserPerscriptionsScreen';
import PrescriptionDetailsScreen from '../screens/PrescriptionDetailsScreen';
import PrescribeToUserScreen from '../screens/PrescribeToUserScreen';


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
                title:"Modificar Prescripción",
                headerStyle: { backgroundColor: colors.primary},
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />
    </Stack.Navigator>
);

export default UserNavigator;
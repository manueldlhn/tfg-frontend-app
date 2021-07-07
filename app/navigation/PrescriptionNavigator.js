import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../config/colors';
import PrescriptionTypesScreen from '../screens/PrescriptionTypesScreen';
import AssociateScreen from '../screens/AssociateScreen';
import PrescribeToUserScreen from '../screens/PrescribeToUserScreen';


const Stack = createStackNavigator();

const PrescriptionNavigator = () => (
    <Stack.Navigator
        mode="modal"
    >
        <Stack.Screen 
            name="PrescriptionTypes"
            component={PrescriptionTypesScreen}
            options={{
                headerShown:true,
                title: "Tipos de Asociaciones",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />
        <Stack.Screen 
            name="PrescribeToUser"
            component={PrescribeToUserScreen}
            options={{
                headerShown:true,
                title: "Prescribir a un Usuario",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />
        <Stack.Screen 
            name="Associate"
            component={AssociateScreen}
            options={{
                headerShown: true,
                title: "Asociar Ejercicio a Rutina",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />

    </Stack.Navigator>
);



export default PrescriptionNavigator;
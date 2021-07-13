import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListingRoutinesScreen from '../screens/ListingRoutinesScreen';
import RoutineDetailsScreen from '../screens/RoutineDetailsScreen';
import CreateRoutineScreen from '../screens/CreateRoutineScreen';
import colors from '../config/colors';
import ListingWorkoutsScreen from '../screens/ListingWorkoutsScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';
import DoingWorkoutScreen from '../screens/DoingWorkoutScreen';


const Stack = createStackNavigator();

const RoutineNavigator = () => (
    <Stack.Navigator
        mode="modal"
    >
        <Stack.Screen 
            name="ListingRoutines" 
            component={ListingRoutinesScreen}
            options={{
                headerShown:true,
                title: "Rutinas",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }} 
        />
        <Stack.Screen
            name="RoutineDetails"
            component={RoutineDetailsScreen}
            options={{
                headerShown:true, 
                title:"Detalles de la Rutina",
                headerStyle: { backgroundColor: colors.primary},
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />
        <Stack.Screen
            name="ListingWorkouts"
            component={ListingWorkoutsScreen}
            options={{
                headerShown: true,
                title:"Ejercicios de la Rutina",
                headerStyle: { backgroundColor: colors.primary},
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />
        <Stack.Screen
            name="WorkoutDetails"
            component={WorkoutDetailsScreen}
            options={{
                headerShown: true,
                title:"Detalles del ejercicio",
                headerStyle: { backgroundColor: colors.primary},
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />
        <Stack.Screen
            name="CreateRoutine"
            component={CreateRoutineScreen}
            options={{
                headerShown:true, 
                title: "Crear nueva Rutina",
                headerStyle: { backgroundColor: colors.primary},
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />
        <Stack.Screen
            name="DoingWorkout"
            component={DoingWorkoutScreen}
            options={{
                headerShown: false,
            }}
        />

    </Stack.Navigator>
);

export default RoutineNavigator;
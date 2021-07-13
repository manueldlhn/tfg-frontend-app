import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListingWorkoutsScreen from '../screens/ListingWorkoutsScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';
import CreateWorkoutScreen from '../screens/CreateWorkoutScreen';
import colors from '../config/colors';
import DoingExerciseScreen from '../screens/DoingWorkoutScreen';
import DoingWorkoutScreen from '../screens/DoingWorkoutScreen';


const Stack = createStackNavigator();

const WorkoutNavigator = () => (
    <Stack.Navigator
        mode="modal"
    >
        <Stack.Screen 
            name="ListingWorkouts" 
            component={ListingWorkoutsScreen}
            options={{
                headerShown:true,
                title: "Ejercicios",
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }} 
        />
        <Stack.Screen
            name="WorkoutDetails"
            component={WorkoutDetailsScreen}
            options={{
                headerShown:true, 
                title:"Detalles del ejercicio",
                headerStyle: { backgroundColor: colors.primary},
                headerTintColor: colors.white,
                headerTitleAlign: "center",
            }}
        />
        <Stack.Screen
            name="CreateWorkout"
            component={CreateWorkoutScreen}
            options={{
                headerShown:true, 
                title: "Crear nuevo Ejercicio",
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

export default WorkoutNavigator;
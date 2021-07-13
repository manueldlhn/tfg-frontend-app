import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { getPreciseDistance } from 'geolib';

import Screen from '../components/Screen';
import Icon from '../components/Icon';
import Text from '../components/Text';
import colors from '../config/colors';


function DoingWorkoutScreen ({ route, navigation }) {
    
    const workout = route.params;

    const [startChrono, setStartChrono] = useState(false);
    const [timeValue, setTimeValue] = useState();
    const [location, setLocation] = useState();
    const [distance, setDistance] = useState(0);
    const [steps, setSteps] = useState(0);
    


    const LOCATION_TASK_NAME = 'background-location-task';
    

    const subscribeToLocationUpdates = async () => {
        const { granted } = await Location.requestPermissionsAsync();
        if(granted){
            await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                accuracy: Location.Accuracy.Highest,
                timeInterval: 5000,
                distanceInterval: 0,                
            });
        } else {
            console.log("No se ha realizado la suscripción");
        }
    };

    const unSuscribeToLocationUpdates = async () => {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    };

    

    TaskManager.defineTask(LOCATION_TASK_NAME, ({data, error}) => {
        if(error){
            return console.log(error.message);
        }
        if(data){
            const {latitude, longitude } = data.locations[0].coords;
            
            if(location === undefined) {
                setLocation({latitude, longitude})
            } else {
                const lastDistance = getPreciseDistance(location, {latitude,longitude}, 0.01);
                console.log("Ultima distancia obtenida: "+lastDistance);
                setDistance(distance => distance = Math.round((distance + lastDistance)*10)/10);
                setLocation({latitude, longitude});
            }
        }
    });


    const stopWorkout = () => {
        console.log("Stop Workout");
        unSuscribeToLocationUpdates()
        .then( () => {
            setStartChrono(false);
            console.log(timeValue);
            console.log(distance);
            console.log(steps);
            navigation.goBack();
        });
    };

    const updateTime = time => {
        setTimeValue(time);
    };


    useEffect(()=> {
        subscribeToLocationUpdates()
        .then( setStartChrono(true) );
    }, []);

    return (
        <Screen style={styles.container}>
            <StatusBar 
                animated={true}
                backgroundColor={colors.black}
                hidden={true}
            />
            <View style={styles.title}>
                <Text style={[styles.text, {fontWeight: "bold", fontSize: 24}]}>{workout.Nombre}</Text>
            </View>
            <View style={styles.timer}>
                {
                //<Text style={[styles.text, {fontWeight: "bold", fontSize: 50, color: colors.gold}]}>00:00:00</Text>}
                }

                <Stopwatch 
                    start={startChrono}
                    getTime={time => 0 }  
                    options={options} 
                />   
            </View>
            <View style={styles.description}>
                <Text style={[styles.text, {fontSize: 12, textAlign: "justify"}]}>{workout.Descripcion+"\n\n"+workout.Comentarios}</Text>
            </View>
            { //(workout.Ubicacion || workout.Podomentro) &&
            <View style={styles.sensors}>
                <Text style={[styles.text, {color: colors.gold, fontWeight: "bold"}]}>{"Distancia recorrida:\t\t"+distance.toString()+" metros\n"}</Text>
                <Text style={[styles.text, {color: colors.gold, fontWeight: "bold"}]}>{"Pasos:\t\t"+steps.toString()}</Text>
            </View>
            }
            <TouchableWithoutFeedback onPress={() => stopWorkout()}>
                <View style={styles.button}>
                    <Icon 
                        name="stop"
                        size={60}
                        backgroundColor={colors.red}
                        iconColor={colors.white}
                    />
                </View>
            </TouchableWithoutFeedback>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
    },
    text: {
        color: colors.white,
    },
    title: {
        position:"absolute",
        top:"5%",
        alignSelf: "center",
    },
    timer: {
        position: "absolute",
        top:"17%",
        alignSelf: "center",
        borderWidth: 2,
        borderRadius: 30,
        borderColor: colors.gold,
        padding: 10,
        paddingLeft:20,
        paddingRight:20,
    },
    description: {
        position: "absolute",
        top:"30%",
        padding:"10%"
    },
    sensors: {
        position: "absolute",
        bottom: "20%",
        left:"10%",
        padding: 15,
        width: "80%",
        borderWidth: 1,
        borderColor: colors.gold,
        borderRadius: 20,
    },
    button: {
        position: "absolute",
        bottom: "5%",
        alignSelf: "center",
    },
});

const options = {
    container: {
        padding: 10,
    },
    text: {
        fontWeight: "bold", 
        fontSize: 50, 
        color: colors.gold
    },
}

export default DoingWorkoutScreen;
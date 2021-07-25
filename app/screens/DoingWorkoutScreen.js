import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { getPreciseDistance } from 'geolib';


import Location from '../sensors/location';
import Gfit from '../sensors/gfit';
import mqtt from '../mqtt/mqtt';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import Text from '../components/Text';
import colors from '../config/colors';


function DoingWorkoutScreen ({ route, navigation }) {
    
    const workout = route.params;
    console.log(workout);

    const {user} = useAuth();

    const [startChrono, setStartChrono] = useState(false);
    const [startTime, setStartTime] = useState(0);
    
    const [distance, setDistance] = useState(0);
    const [steps, setSteps] = useState(0);

    const UPDATE_TASK_NAME = 'Periodic_Workout_Task';

    var mqttClient;

    var wk_info = {
        Usuario: user.Email,
        Nombre_ej: workout.Nombre,
        Tiempo_ej: '00:00:00',
        Ultimo_msg: false,
    };
    var location;

    workout.Ubicacion && (wk_info.Distancia = distance);
    workout.Podometro && (wk_info.Pasos = steps);

    useEffect(()=> {
        console.log("Empezamos ejercicio");
        setStartChrono(true);
        setStartTime(Date.now());
        mqttClient = mqtt.getClient({client_id: user.Email});

        Location.subscribeToLocationUpdates(UPDATE_TASK_NAME);
        
        if(workout.Podometro){
            setSteps(0);
        }

        console.log("Todo listo, empezamos ejercicios");

    }, []);


    const stopWorkout = async () => {
        console.log("Stop Workout");
        await Location.unSuscribeToLocationUpdates(UPDATE_TASK_NAME);
        setStartChrono(false);
        updateWorkoutTime(); // Último
        wk_info.Ultimo_msg = true;
        mqtt.sendMsg(JSON.stringify(wk_info), workout.especialista_email); // Último
        mqtt.disconnect();
        console.log(wk_info);
        // almacenar en la bbdd

        var info_adicional ="";
        "Distancia" in wk_info && (info_adicional += "Distancia: "+wk_info.Distancia+"m ; ");
        "Pasos" in wk_info && (info_adicional += "Pasos: "+wk_info.Pasos+"; ");

        var record = {
            USUARIOS_Email: wk_info.Usuario,
            EJERCICIO_ej_id: workout.ej_id,
            RUTINA_rut_id: workout.RUTINA_rut_id ? workout.RUTINA_rut_id : null,
            Fecha_Hora: new Date(startTime).toString(),
            Tiempo_ej: wk_info.Tiempo_ej,
            Info_Adicional: info_adicional,
        };

        console.log(record);



        navigation.goBack();
    };

    
    

    TaskManager.defineTask(UPDATE_TASK_NAME, ({data, error}) => {
        if(error){
            return console.log(error.message);
        } else {
            if(workout.Ubicacion){
                const {latitude, longitude } = data.locations[0].coords;
                if(location !== undefined) {
                    const lastDistance = getPreciseDistance(location, {latitude,longitude}, 0.01);
                    setDistance(Math.round((distance + lastDistance)*10)/10);
                }
                location = {latitude, longitude};
            }
            if(workout.Podometro){
                const stepResult = Gfit.getSteps(startTime);
                console.log("stepResult: "+stepResult);
                //if(!stepResult.error) setSteps(steps => steps + stepResult.data);
            }
            updateWorkoutTime();
            console.log(wk_info);
            mqtt.sendMsg(JSON.stringify(wk_info), workout.especialista_email);
        }
    });

    const updateWorkoutTime = () => {
        const timeDiff = new Date(Date.now()).getTime() - startTime; // En milisegundos
        wk_info.Tiempo_ej = new Date(timeDiff).toISOString().substr(11,8);
    }


    
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
                <Stopwatch 
                    start={startChrono}
                    options={options} 
                />   
            </View>
            <View style={styles.description}>
                <Text style={[styles.text, {fontSize: 12, textAlign: "justify"}]}>{workout.Descripcion+"\n\n"+workout.Comentarios}</Text>
            </View>
            { (workout.Ubicacion || workout.Podomentro) &&
            <View style={styles.sensors}>
                {workout.Ubicacion && <Text style={[styles.text, {color: colors.gold, fontWeight: "bold"}]}>{"Distancia recorrida:\t\t"+distance.toString()+" metros\n"}</Text>}
                {workout.Podometro && <Text style={[styles.text, {color: colors.gold, fontWeight: "bold"}]}>{"Pasos:\t\t"+wk_info.Pasos}</Text>}
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
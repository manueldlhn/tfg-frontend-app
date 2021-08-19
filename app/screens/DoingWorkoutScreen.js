/* ---------------------------
 *    Nombre del fichero: DoingWorkoutScreen.js
 *    Descripción: Este fichero contiene la pantalla que se muestra al usuario
 *                 cuando está realizando un ejercicio       
 *    Contenido:  
 *          - DoingWorkoutScreen: Función que regula el comportamiento y define el aspecto
 *                                de dicha pantalla.      
 * ---------------------------  
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import * as TaskManager from 'expo-task-manager';
import { getPreciseDistance } from 'geolib';
import {WebView } from "react-native-webview";


import Location from '../sensors/location';
import Gfit from '../sensors/gfit';
import mqtt from '../mqtt/mqtt';
import recordsApi from '../api/records';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import Text from '../components/Text';
import colors from '../config/colors';

/* --------------------------
 *    Nombre de la Función: DoingWorkoutScreen
 *    Funcionamiento: Define la vista y actualiza la información de tiempo y sensores,
 *                    así como facilita un video en ciertos casos.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - route: Objeto ruta, se empleará para extraer los parámetros.
 *                              - navigation: Objeto de navegación, se empleará para cambiar de vista.
 *    Devuelve: La vista renderizada.
 * --------------------------
 */
function DoingWorkoutScreen ({ route, navigation }) {
    // Extraemos los parámetros de route.
    const workout = route.params;
    // Obtenemos el usuario que hace el ejercicio.
    const {user} = useAuth();

    // HOOKS:
    // startChrono: Regula el temporizador.
    const [startChrono, setStartChrono] = useState(false);
    // startTime: Define fecha y hora de inicio.
    const [startTime, setStartTime] = useState(0);
    // distance: Define la distancia recorrida.
    const [distance, setDistance] = useState(0);
    // steps: Define los pasos realizados.
    const [steps, setSteps] = useState(0);

    // Nombre de la tarea que se encargará de actualizar todo periódicamente
    const UPDATE_TASK_NAME = 'Periodic_Workout_Task';

    var mqttClient;

    // Estructura básica del mensaje que se enviará por MQTT
    var wk_info = {
        Usuario: user.Email,
        Nombre_ej: workout.Nombre,
        Tiempo_ej: '00:00:00',
        Ultimo_msg: false,
    };
    var location;

    // Si procede, se añade información de distancia y/o pasos.
    workout.Ubicacion && (wk_info.Distancia = distance);
    workout.Podometro && (wk_info.Pasos = steps);

    // Hook useEffect que se ejecuta una vez al principio, para comenzar el ejercicio.
    useEffect(()=> {
        console.log("Empezamos ejercicio");
        setStartChrono(true);
        setStartTime(Date.now());
        mqttClient = mqtt.getClient({client_id: user.Email}); // Es publicador, no enviamos función de callback para recibir mensajes
        // Comenzamos a recibir periódicamente los datos de ubicación.
        Location.subscribeToLocationUpdates(UPDATE_TASK_NAME, workout.Ubicacion);
        
        if(workout.Podometro){
            setSteps(0);
        }

    }, []);

    /* --------------------------
    *    Nombre de la Función: stopWorkout
    *    Funcionamiento: Se ejecutará al detener el ejercicio pulsando Stop. Se encarga de detener
    *                    la recepción de datos de ubicación periódica, detener el temporizador,
    *                    actualizar por última vez la información de sensores, y tornar a true la 
    *                    flag de ejercicio terminado (Ultimo_msg). Tras esto, envía un último mensaje
    *                    a la cola MQTT y se desconecta. Después, sube el registro completo del ejercicio
    *                    a la bbdd.
    *    Argumentos que recibe: Ninguno
    *    Devuelve: Nada (void).
    * --------------------------
    */
    const stopWorkout = async () => {

        // Detener la recepción periódica de datos.
        await Location.unSuscribeToLocationUpdates(UPDATE_TASK_NAME);
        setStartChrono(false); // Paramos el temporizador.
        updateWorkoutTime(); // Última ejecución
        wk_info.Ultimo_msg = true;
        mqtt.sendMsg(JSON.stringify(wk_info), workout.especialista_email); // Último enviado
        mqtt.disconnect();


        // almacenar en la bbdd

        var info_adicional =""; // Se llenará con datos de sensores.
        "Distancia" in wk_info && (info_adicional += "Distancia: "+wk_info.Distancia+"m ; ");
        "Pasos" in wk_info && (info_adicional += "Pasos: "+wk_info.Pasos+"; ");

        // Fecha de inicio con formato adecuado.
        const date = new Date(startTime);
        
        const formattedDate = date.getDate().toString() +'/'+
                              (date.getMonth()+1).toString() +'/'+
                              date.getFullYear().toString()+' '+
                              (date.getHours() < 10 ? "0" : "")+date.getHours().toString()+':'+
                              (date.getMinutes() < 10 ? "0" : "")+date.getMinutes().toString()+':'+
                              (date.getSeconds() < 10 ? "0" : "")+date.getSeconds().toString();
        // Estructura de los datos a enviar a la API.
        var record = {
            USUARIOS_Email: wk_info.Usuario,
            EJERCICIO_ej_id: workout.ej_id,
            RUTINA_rut_id: workout.RUTINA_rut_id ? workout.RUTINA_rut_id : null,
            Fecha_Hora: formattedDate,
            Tiempo_ejercicio: wk_info.Tiempo_ej,
            Info_Adicional: info_adicional,
        };
        
        const result = await recordsApi.addRecord(record);
        console.log(result.ok);
        // Vuelta a la pantalla anterior.
        navigation.goBack();
    };

    
    
    /* --------------------------
    *    Nombre de la Función: - (Task a ejecutar periódicamente)
    *    Funcionamiento: Tras cada recepción de datos de ubicación, comprueba errores, calcula
    *                    la distancia respecto los datos anteriores, establece la ubicación y
    *                    actualiza el tiempo transcurrido y los pasos.
    *    Argumentos que recibe: Objeto que contiene:
    *                               - data: Datos de ubicación.
    *                               - error: Error (si lo ha habido).
    *    Devuelve: Nada (void)
    * --------------------------
    */
    TaskManager.defineTask(UPDATE_TASK_NAME, ({data, error}) => {
        if(error){
            return console.log(error.message);
        } else { // Si no hay errores.
            if(workout.Ubicacion){
                const {latitude, longitude } = data.locations[0].coords;
                if(location !== undefined) { // Si procede, se actualiza la distancia.
                    const lastDistance = getPreciseDistance(location, {latitude,longitude}, 0.01);
                    setDistance(Math.round((distance + lastDistance)*10)/10);
                }
                location = {latitude, longitude};
            }
            if(workout.Podometro){ // Si procede, se actualizan los pasos
                const stepResult = Gfit.getSteps(startTime);
                console.log("stepResult: "+stepResult);
                //if(!stepResult.error) setSteps(steps => steps + stepResult.data);
            }
            // Actualizamos el temporizador
            updateWorkoutTime();
            console.log(wk_info);
            // Enviamos mensaje a la cola con los datos.
            mqtt.sendMsg(JSON.stringify(wk_info), workout.especialista_email);
        }
    });


    /* --------------------------
    *    Nombre de la Función: updateWorkoutTime
    *    Funcionamiento: Calcula la diferencia de tiempo transcurrido entre el momento de la
    *                    ejecución y el momento de inicio del ejercicio, y le da formato para
    *                    almacenarlo en el objeto de mensaje.
    *    Argumentos que recibe: Ninguno.
    *    Devuelve: Nada (Void).
    * --------------------------
    */
    const updateWorkoutTime = () => {
        const timeDiff = new Date(Date.now()).getTime() - startTime; // En milisegundos
        wk_info.Tiempo_ej = new Date(timeDiff).toISOString().substr(11,8);
    };


    
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
            { // Si hay información de distancia o pasos que mostrar
            (workout.Ubicacion || workout.Podomentro) ?
            (    
                <View style={styles.sensors}>
                    {workout.Ubicacion && <Text style={[styles.text, {color: colors.gold, fontWeight: "bold"}]}>{"Distancia recorrida:\t\t"+distance.toString()+" metros\n"}</Text>}
                    {workout.Podometro && <Text style={[styles.text, {color: colors.gold, fontWeight: "bold"}]}>{"Pasos:\t\t"+wk_info.Pasos}</Text>}
                </View>
            ):( // En otro caso, se mostrará un video para el ejercicio en estático.
                workout.Video ?
                (
                    <WebView 
                        style={styles.video}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{uri: workout.Video}}
                    />
                ) : (
                    <Text style={[styles.text, {color: colors.gold, fontWeight: "bold"}]}>Este ejercicio no tiene link a ningún video explicativo.</Text>
                )
            )}
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
    video: {
        position: "absolute",
        bottom: "20%",
        left: "10%",
        flex: 0,
        height: 200,
        width: "80%",
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
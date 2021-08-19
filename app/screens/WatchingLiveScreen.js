/* ---------------------------
 *    Nombre del fichero: WatchingLiveScreen.js
 *    Descripción: Este fichero contiene la pantalla de seguimiento de usuarios realizando ejercicios.       
 *    Contenido:
 *         - WatchingLiveScreen: Función que regula el comportamiento y la vista de la pantalla.        
 * ---------------------------  
 */

import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import LiveUserCard from '../components/cards/LiveUserCard';
import colors from '../config/colors';
import mqtt from '../mqtt/mqtt';
import useAuth from '../auth/useAuth';
import constants from '../config/constants';

/* --------------------------
 *    Nombre de la Función: WatchingLiveScreen
 *    Funcionamiento: Se suscribe a la cola de mensajes y trata los mensajes que 
 *                    vaya recibiendo.
 *    Argumentos que recibe: Ninguno
 *    Devuelve: La pantalla renderizada.
 * --------------------------
 */
function WatchingLiveScreen() {
    // Extraemos  el usuario de useAuth
    const {user} = useAuth();
    // HOOKS
    // liveUsers se utilizará para almacenar los usuarios que envíen mensajes.
    const [liveUsers, setLiveUsers] = useState([]);

    // Tiempos de vida de los mensajes.
    // Delete es para cuando se ha recibido el último. Expiry es para por si no se reciben más (Pérdida de conexión).
    const DELETETIME = constants.LIVEMSG_DELETE_TIME*1000; // En milisegundos
    const EXPIRYTIME = constants.LIVEMSG_EXPIRY_TIME*1000 // En milisegundos

    // Usamos el hook useEffect para inicializar el array y obtener el cliente MQTT conectado a la cola de mensajes.

    var mqttClient;
    
    useEffect( ()=> {
        mqttClient = mqtt.getClient({client_id: user.Email, callback: updateLiveUsers});
        setLiveUsers([]);
    }, []);

    /* --------------------------
    *    Nombre de la Función: updateLiveUsers
    *    Funcionamiento: Ante un nuevo mensaje, trata de darle formato JSON, y se establece el tiempo de vida.
    *                    A continuación se sustituye si hay uno ya del mismo usuario, o se añade nuevo.
    *    Argumentos que recibe:
    *           - message: Objeto mensaje MQTT recibido.
    *    Devuelve:
    *           - Nada (void).
    * --------------------------
    */
    const updateLiveUsers = (message) => {
        console.log("updateLiveUsers");
        try {
            var userData = JSON.parse(message.payloadString);           
            userData.expiry = (userData.Ultimo_msg) ? Date.now()+DELETETIME : Date.now()+EXPIRYTIME;

            // Actualizamos liveUsers
            setLiveUsers(liveUsers => {
                // Flag para llegado el momento saber si se ha sustituido otro o no.
                var sustituido = false;
                var newLiveUsers = [];
                if (liveUsers.length != 0) {
                    newLiveUsers = liveUsers.map(liveUser => { // Para cada mensaje almacenado, se compara el usuario con el recibido.
                        // Si coincide el usuario, se usa el nuevo. Si no, se devuelve el existente.
                        const element = (liveUser.Usuario == userData.Usuario) ? userData : liveUser;
                        if(element.Usuario == userData.Usuario) sustituido = true;
                        return element;
                    });
                } // Si no ha habido sustitución al recorrer el array, se añade al principio
                if(!sustituido) newLiveUsers = [userData, ...liveUsers];

                // Filtramos los registros expirados para eliminarlos.
                return newLiveUsers.filter( element => element.expiry > Date.now());
            });
            

        } catch (error) { // En caso de error
            console.log(error);
        }
    }

    


    return (
        <Screen style={styles.screen}>
            { liveUsers != [] &&
            <FlatList 
                data={liveUsers}
                keyExtractor={(liveUser, index) => liveUser.Usuario}
                renderItem={({item}) => 
                    <LiveUserCard
                        Usuario={item.Usuario}
                        Nombre_ej={item.Nombre_ej}
                        Tiempo_ej={item.Tiempo_ej}
                        Ultimo_msg={item.Ultimo_msg}
                        Distancia={"Distancia" in item ? item.Distancia : null}
                        Pasos={"Pasos" in item ? item.Pasos : null}
                    />
                }
            />}
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        backgroundColor: colors.lightprimary,
    }
})

export default WatchingLiveScreen;
/* ---------------------------
 *    Nombre del fichero: mqtt.js
 *    Descripción: Este fichero contiene toda la lógica de funcionamiento de la cola de mensajes MQTT en la app.       
 *    Contenido: Tras inicializarse con init, se define lo siguiente:
 *          - HOST: Host del broker MQTT.
 *          - PORT: Puerto del broker MQTT.
 *          - client: Objeto cliente MQTT.
 *          - callbackSUBS: Callback que (si procede) se ejecutará tras recibir un mensaje.
 *          - onConnect: Función a ejecutar tras conectarse a la cola.
 *          - onConnectionLost: Función a ejecutar tras perder la conexión a la cola.
 *          - onMessageArrived: Función a ejecutar tras recibir un mensaje.
 *          - getClient: Función que crea el cliente si no existe y lo devuelve.
 *          - sendMsg: Función para enviar un mensaje a la cola.
 *          - disconnect: Función para desconectarse. 
 * ---------------------------  
 */

import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../config/constants';

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    reconnect: true,
    sync: {

    }
});

const HOST = constants.MQTT_HOST;
const PORT = constants.MQTT_PORT;

var client;
var callbackSUBS = '';


/* --------------------------
 *    Nombre de la Función: onConnect
 *    Funcionamiento: Si el usuario conectado es suscriptor, se suscribe a la cola.
 *    Argumentos que recibe:
 *              - client_id: Identificador de cliente (email).
 *    Devuelve: Nada (void).
 * --------------------------
 */
const onConnect = (client_id) => {
    console.log("Conectado a "+HOST+":"+PORT+" - clientID: "+client_id);
    callbackSUBS != '' && client.subscribe(client_id, {onSuccess: () => console.log("Suscrito")});
};


/* --------------------------
 *    Nombre de la Función: onConnectionLost
 *    Funcionamiento: Informar de que se ha perdido la conexión a la cola de mensajes.
 *    Argumentos que recibe:
 *              - responseObject: Objeto de respuesta, con información detallada sobre errores, etc.
 *    Devuelve: Nada (void).
 * --------------------------
 */
const onConnectionLost = (responseObject) => {
    if(responseObject.errorCode !== 0)
        console.log("onConnectionLost: "+responseObject.errorMessage);
};


/* --------------------------
 *    Nombre de la Función: onMessageArrived
 *    Funcionamiento: Ejecuta el callback de suscriptor pasándole como parámetro el mensaje.
 *    Argumentos que recibe:
 *              - message: Mensaje recibido.
 *    Devuelve: Nada (void).
 * --------------------------
 */
const onMessageArrived = (message) => {
    if(callbackSUBS != '') callbackSUBS(message);
};


/* --------------------------
 *    Nombre de la Función: getClient
 *    Funcionamiento: Si el cliente no existe, lo crea y se conecta a la cola de mensajes,
 *                    asociando todos los callbacks que requerirá durante el funcionamiento.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - client_id: Identificador de cliente.
 *                              - callback: callback a ejecutar tras recibir mensajes (en caso de suscriptor).
 *    Devuelve: El objeto cliente (client).
 * --------------------------
 */
const getClient = async ({client_id, callback }) => {
    callbackSUBS = callback;
    if ( client === undefined ) {
        client = new Paho.MQTT.Client(HOST, PORT, client_id);
        client.onConnectionLost = onConnectionLost;
        if(callbackSUBS != '') {
            client.onMessageArrived = onMessageArrived;
        }
    }
    if(!client.isConnected()) client.connect({ onSuccess: () => onConnect(client_id), useSSL: false });
    


    return client; 
}



/* --------------------------
 *    Nombre de la Función: sendMsg
 *    Funcionamiento: Si el cliente está conectado, crea el objeto mensaje y lo envía a la cola.
 *    Argumentos que recibe:
 *              - msg: Texto del mensaje.
 *              - topic: Topic (identificador de cola) al que publicará el mensaje.
 *    Devuelve: Nada (void).
 * --------------------------
 */
const sendMsg = async (msg, topic) => {
    const connected = client.isConnected();
    if(connected){
        let message = new Paho.MQTT.Message(msg);
        message.destinationName = topic;
        client.send(message);
    } else {
        console.log("Cliente no conectado");
    }
}


/* --------------------------
 *    Nombre de la Función: disconnect
 *    Funcionamiento: Desconecta al cliente de la cola de mensajes.
 *    Argumentos que recibe: Ninguno
 *    Devuelve: Resultado de ejecutar client.disconnect().
 * --------------------------
 */
const disconnect = () => {
    console.log("Disconnecting...");
    return client.disconnect();
}


export default {
    getClient,
    sendMsg,
    disconnect,
}
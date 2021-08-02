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



const onConnect = (client_id) => {
    console.log("Conectado a "+HOST+":"+PORT+" - clientID: "+client_id);
    callbackSUBS != '' && client.subscribe(client_id, {onSuccess: () => console.log("Suscrito")});
};

const onConnectionLost = (responseObject) => {
    if(responseObject.errorCode !== 0)
        console.log("onConnectionLost: "+responseObject.errorMessage);
};

const onMessageArrived = (message) => {
    if(callbackSUBS != '') callbackSUBS(message);
};

const getClient = async ({client_id, callback }) => {
    console.log("getClient con id: "+client_id);
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


const sendMsg = async (msg, topic) => {
    const connected = client.isConnected();
    console.log(connected);
    if(connected){
        let message = new Paho.MQTT.Message(msg);
        message.destinationName = topic;
        client.send(message);
    } else {
        console.log("Cliente no conectado");
    }
}

const disconnect = () => {
    console.log("Disconnecting...");
    return client.disconnect();
}


export default {
    getClient,
    sendMsg,
    disconnect,
}
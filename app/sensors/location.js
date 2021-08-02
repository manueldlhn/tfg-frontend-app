import * as Location from 'expo-location';
import colors from '../config/colors';
import constants from '../config/constants';




const subscribeToLocationUpdates = async (taskName, usingLocation) => {
    const { granted } = await Location.requestPermissionsAsync();
    if(granted){
        await Location.startLocationUpdatesAsync(taskName, {
            accuracy: usingLocation ? Location.Accuracy.Highest : Location.Accuracy.Lowest ,
            timeInterval: constants.MQTT_PUBLISH_FREQ*1000, // En milisegundos
            distanceInterval: 0,   
            foregroundService: {
                notificationTitle: "Usando ubicación",
                notificationBody: "La app se seguirá ejecutando en segundo plano",
                notificationColor: colors.primary,
            },          
        });
    } else {
        console.log("No se ha realizado la suscripción");
    }
};

const unSuscribeToLocationUpdates = async (taskName) => {
    await Location.stopLocationUpdatesAsync(taskName);
};

export default {
    subscribeToLocationUpdates,
    unSuscribeToLocationUpdates,
}
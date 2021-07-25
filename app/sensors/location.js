import * as Location from 'expo-location';
import colors from '../config/colors';




const subscribeToLocationUpdates = async (taskName) => {
    const { granted } = await Location.requestPermissionsAsync();
    if(granted){
        await Location.startLocationUpdatesAsync(taskName, {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 5000,
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
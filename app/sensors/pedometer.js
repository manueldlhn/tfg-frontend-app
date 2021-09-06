import {Pedometer} from 'expo-sensors';
var subscription;
var steps;

const subscribeToStepUpdates = () => {
    Pedometer.isAvailableAsync()
    .then( available => {
        console.log("isAvailable: "+available);
        if(available)
            Pedometer.requestPermissionsAsync()
            .then( result => {
                console.log("Permiso solicitado: ");
                console.log(result);
                if(result.granted)
                    subscription = Pedometer.watchStepCount(updateSteps);
                    steps = 0;
            });
    });
};

// No se le llama nunca. WatchStepCount no funciona.
const updateSteps = PedometerResult => {
    console.log("Llamado a updateSteps");
    steps = PedometerResult.steps;
};


const unSuscribeToStepUpdates = () => {
    console.log("Llamado a unsuscribe");
    subscription.remove();
};



const getSteps = () => {
    console.log("Llamado a getSteps. Valor: "+steps);
    return steps;
};


export default {
    subscribeToStepUpdates,
    unSuscribeToStepUpdates,
    getSteps,
}
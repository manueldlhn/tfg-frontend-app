/* ---------------------------
 *    Nombre del fichero: location.js 
 *    Descripción: Este fichero contiene todo el código relacionado con el uso de la ubicación en la app.        
 *    Contenido: 
 *          - suscribeToLocationUpdates: Función para suscribirse a actualizaciones periódicas de ubicación.
 *          - unSuscribeToLocationUpdates: Función para desuscribirse de actualizaciones periódicas de ubicación.       
 * ---------------------------  
 */

import * as Location from 'expo-location';

import colors from '../config/colors';
import constants from '../config/constants';

/* --------------------------
 *    Nombre de la Función: suscribeToLocationUpdates
 *    Funcionamiento: Se solicita permiso para usar la ubicación y, si se otorga,
 *                    Se llama a startLocationUpdatesAsync para obtener de forma
 *                    periódica información sobre la ubicación.
 *
 *                    Nota: En algunos casos no se usará la ubicación aunque se llame a esta
 *                    función.
 *    Argumentos que recibe:
 *              - taskName: Nombre de la función a ejecutar cada vez que se reciban nuevos datos de
 *                          ubicación.
 *              - usingLocation: Flag boolean para informar de si se utilizará la ubicación o no.
 *                               Esto es porque se va a utilizar esta suscripción periódica para
 *                               enviar con la misma frecuencia mensajes a la cola MQTT. Por ello,
 *                               aunque algunos ejercicios no usen ubicación, se valdrán de esta
 *                               función. Para no utilizar en vano la ubicación a su máxima precisión
 *                               (mayor consumo), si la flag está en "false" (no se utilizará),
 *                               la precisión será la menor posible (Location.Accuracy.Lowest).
 *    Devuelve: Nada (void).
 * --------------------------
 */
const subscribeToLocationUpdates = async (taskName, usingLocation) => {
    const { granted } = await Location.requestPermissionsAsync();
    /* 
        Nota sobre requestPermissionsAsync: Aunque en teoría está deprecated, sigue funcionando y se logra
                                            permisos a la vez para ejecutar en foreground y en background.
    */
    if(granted){ // Se otorga permiso de ubicación.
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


/* --------------------------
 *    Nombre de la Función: unSuscribeToLocationUpdates
 *    Funcionamiento: Detiene la recepción periódica de información sobre ubicación.
 *    Argumentos que recibe: 
 *              - taskName: Nombre de la función a ejecutar cuando se reciben datos de ubicación.
 *    Devuelve: Nada (void).
 * --------------------------
 */
const unSuscribeToLocationUpdates = async (taskName) => {
    await Location.stopLocationUpdatesAsync(taskName);
};

export default {
    subscribeToLocationUpdates,
    unSuscribeToLocationUpdates,
}
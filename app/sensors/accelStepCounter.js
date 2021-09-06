/* ---------------------------
 *    Nombre del fichero: accelStepCounter.js 
 *    Descripción: Este fichero contiene todo el código relacionado con el uso de la ubicación en la app.        
 *    Contenido: 
 *          - suscribeToStepUpdates: Función para suscribirse a actualizaciones periódicas de ubicación.
 *          - count: Función para contar los pasos  en base a los datos del acelerómetro.
 *          - unSuscribeToStepUpdates: Función para desuscribirse de actualizaciones periódicas de ubicación.
 *          - getSteps: Función para devolver los pasos.       
 * ---------------------------  
 */

import { Accelerometer } from "expo-sensors";

// Numero de pasos
var steps;
// Flag para iniciar la cuenta de un paso y limitar contar más de una vez los mismos.
var countingStep = false;

// Flag para indicar si el acelerómetro se  encuentra disponible.
var available; 

// Tiempo de refresco de la información del acelerómetro.
const UPDATE_INTERVAL = 150; // ms
// Umbral del módulo del vector del acelerómetro (en G) para considerar un paso.
const STEP_COUNT_THRESHOLD = 0.3;


/* --------------------------
 *    Nombre de la Función: subscribeToStepUpdates
 *    Funcionamiento: Comprueba que el acelerómetro se encuentre disponible, establece el intervalo
 *                    de refresco de los datos, y añade el listener que se encargará de gestionarlos.
 *    Argumentos que recibe: Ninguno
 *    Devuelve: Nada (void).
 * --------------------------
 */
const subscribeToStepUpdates = () => {
    Accelerometer.isAvailableAsync()
    .then( result => {
        available = result;
        if(available){
            steps = 0;
            Accelerometer.setUpdateInterval(UPDATE_INTERVAL);
            Accelerometer.addListener(counter);
        } else {
            console.log("No está disponible el acelerómetro");
        }
        
    });
};

/* --------------------------
 *    Nombre de la Función: counter
 *    Funcionamiento: Calcula el módulo del vector de aceleración, y si sobrepasa el límite
 *                    establecido, comienza a contabilizar un paso, previniendo el contarlo
 *                    más de una vez.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - x: Componente x del vector de aceleración.
 *                              - y: Componente y del vector de aceleración.
 *                              - z: Componente z del vector de aceleración.
 *    Devuelve: Nada (void).
 * --------------------------
 */
const counter = ({x, y, z}) => {

    // Calculamos el módulo del vector.
    const vector_module = Math.sqrt(x*x + y*y + z*z) - 1; // El -1 correspondiente a la gravedad, que siempre está presente (?)
    if(vector_module >= STEP_COUNT_THRESHOLD && countingStep == false){
        // Incrementamos el contador, y establecemos la flag para no repetir paso.
        steps = steps + 1;
        countingStep = true;
        console.log("Pasos: "+steps);
    } else // Si ya queda por debajo del umbral, se establece a false de nuevo.
        countingStep = false;
};

/* --------------------------
 *    Nombre de la Función: unSuscribeToStepUpdates
 *    Funcionamiento: Desactiva el listener para dejar de recibir información de acelerómetro.
 *    Argumentos que recibe: Ninguno.
 *    Devuelve: Nada (void).
 * --------------------------
 */
const unSuscribeToStepUpdates = () => {
    console.log("Desuscribiendo");
    if(available) // Si no está available, significa que no se ha activado antes.
        Accelerometer.removeAllListeners();
};


/* --------------------------
 *    Nombre de la Función: getSteps
 *    Funcionamiento: Devuelve los pasos contabilizados.
 *    Argumentos que recibe:
 *    Devuelve:
 * --------------------------
 */
const getSteps = () => {
    return steps;
};






export default {
    subscribeToStepUpdates,
    unSuscribeToStepUpdates,
    getSteps,
}
/* ---------------------------
 *    Nombre del fichero: workouts.js
 *    Descripción: Fichero que contiene las funciones de uso de la API relacionadas con
 *                 los ejercicios.        
 *    Contenido:
 *          - createWorkout: Función que realiza una petición POST al servidor, para
 *                           crear un nuevo ejercicio.
 *          - getWorkouts: Función que realiza una petición GET al servidor, para
 *                         obtener ejercicios.
 *          - getWorkout: Función que realiza una petición GET al servidor, para
 *                        obtener un único ejercicio.
 *          - updateWorkout: Función que realiza una petición PUT al servidor, para
 *                           actualizar la información de un ejercicio.
 *          - deleteWorkout: Función que realiza una petición DELETE al servidor, para
 *                           eliminar un ejercicio.        
 * ---------------------------  
 */

import client from './client';

const endpoint='/Workout';

// Formato de definición de funciones:
// const metodo_api = (parametros) => client.<tipo_peticion>(ruta_relativa, parámetros);

const createWorkout = workout => client.post(endpoint, workout);
const getWorkouts = offset => client.get(endpoint+'/?offset='+offset);
const getWorkout = ej_id => client.get(endpoint+'/'+ej_id);
const updateWorkout = workout => client.put(endpoint+'/'+workout.ej_id, workout )
const deleteWorkout = ej_id => client.delete(endpoint+'/'+ej_id);


export default {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout,
};
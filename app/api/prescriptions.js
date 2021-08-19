/* ---------------------------
 *    Nombre del fichero: 
 *    Descripción: Contiene las funciones de uso de la API relacionadas con las
 *                 prescripciones y asociaciones.    
 *    Contenido: 
 *          - prescribe_**: Funciones que realizan peticiones POST al servidor,
 *                          enfocadas a las tablas que relacionan Usuario, Rutina
 *                          y Ejercicio.
 *          - getAllAssociations: Función que realiza una petición GET al servidor. (En la versión final no se usa).
 *          - get***From**: Funciones que realizan peticiones GET al servidor, enfocadas
 *                          a las tablas que relacionan Usuario, Rutina y Ejercicio.
 *          - update***From***: Funciones que realizan peticiones PUT al servidor,
 *                              enfocadas a las tablas que relacionan Usuario, Rutina y Ejercicio.
 *          - delete***From***: Funciones que realizan peticiones DELETE al servidor,
 *                              enfocadas a las tablas que relacionan Usuario, Rutina y Ejercicio.
 *                                        
 * ---------------------------  
 */

import client from './client';

const endpoint_WR='/WorkoutRoutine';
const endpoint_UW='/UserWorkout';
const endpoint_UR='/UserRoutine';

// Formato de definición de funciones:
// const metodo_api = (parametros) => client.<tipo_peticion>(ruta_relativa, parámetros);

const prescribe_WR = workoutRoutine => client.post(endpoint_WR, workoutRoutine);
const prescribe_UW = userWorkout => client.post(endpoint_UW, userWorkout);
const prescribe_UR = userRoutine => client.post(endpoint_UR, userRoutine);

//const getAllAssociations = offset => client.get(endpoint_WR+'/All/?offset='+offset); // EN DESUSO

const getWorkoutsFromRoutine = (rut_id, offset) => client.get(endpoint_WR+'/Routine/'+rut_id+'/?offset='+offset);
const getRoutinesFromUser = (email, offset) => client.get(endpoint_UR+'/User/'+email+'/?offset='+offset);
const getWorkoutsFromUser = (email, offset) => client.get(endpoint_UW+'/User/'+email+'/?offset?'+offset);

const updateWorkoutFromRoutine = workoutRoutine => client.put(endpoint_WR+'/'+workoutRoutine.EJERCICIO_ej_id+'/'+workoutRoutine.RUTINA_rut_id, { Comentarios: workoutRoutine.Comentarios , USUARIOS_Email: workoutRoutine.USUARIOS_Email })
const updateRoutineFromUser = ({rutina_id, usuario_email, Comentarios}) => client.put(endpoint_UR+'/User-&-Routine/'+usuario_email+'/'+rutina_id, {Comentarios: Comentarios});
const updateWorkoutFromUser = ({ejercicio_id, usuario_email, Comentarios}) => client.put(endpoint_UW+'/User-&-Workout/'+usuario_email+'/'+ejercicio_id, {Comentarios: Comentarios});

const deleteWorkoutFromRoutine = (ejercicio_id, rutina_id) => client.delete(endpoint_WR+'/Workout-&-Routine/'+ejercicio_id+'/'+rutina_id);
const deleteRoutineFromUser = (rutina_id, usuario_email) => client.delete(endpoint_UR+'/User-&-Routine/'+usuario_email+'/'+rutina_id);
const deleteWorkoutFromUser = (ejercicio_id, usuario_email) => client.delete(endpoint_UW+'/User-&-Workout/'+usuario_email+'/'+ejercicio_id);
 

export default {
    prescribe_WR,
    prescribe_UW,
    prescribe_UR,

    //getAllAssociations,

    getWorkoutsFromRoutine,
    getRoutinesFromUser,
    getWorkoutsFromUser,

    updateWorkoutFromRoutine,
    updateRoutineFromUser,
    updateWorkoutFromUser,

    deleteWorkoutFromRoutine,
    deleteRoutineFromUser,
    deleteWorkoutFromUser,
};
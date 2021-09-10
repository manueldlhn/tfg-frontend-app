/* ---------------------------
 *    Nombre del fichero: routines.js
 *    Descripción: Fichero que contiene las funciones de uso de la API relacionadas con
 *                 las rutinas.        
 *    Contenido:
 *          - createRoutine: Función que realiza una petición POST al servidor, para
 *                           crear una nueva rutina.
 *          - getRoutines: Función que realiza una petición GET al servidor, para
 *                         obtener rutinas.
 *          - getRoutine: Función que realiza una petición GET al servidor, para
 *                        obtener una única rutina.
 *          - updateRoutine: Función que realiza una petición PUT al servidor, para
 *                           actualizar la información de una rutina.
 *          - deleteRoutine: Función que realiza una petición DELETE al servidor, para
 *                           eliminar una rutina.        
 * ---------------------------  
 */

import client from './client';


const endpoint='/Routine';

// Formato de definición de funciones:
// const metodo_api = (parametros) => client.<tipo_peticion>(ruta_relativa, parámetros);


const createRoutine = routine => client.post(endpoint, routine );
const getRoutines = offset => client.get(endpoint+'/?offset='+offset);
const getRoutine = rut_id => client.get(endpoint+'/'+rut_id);
const updateRoutine = routine => client.put(endpoint+'/'+routine.rut_id, routine )
const deleteRoutine = rut_id => client.delete(endpoint+'/'+rut_id);

export default {
    createRoutine,
    getRoutines,
    // getRoutine, // En desuso
    updateRoutine,
    deleteRoutine,
};
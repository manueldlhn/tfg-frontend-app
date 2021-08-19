/* ---------------------------
 *    Nombre del fichero: records.js
 *    Descripción: Fichero que contiene las funciones de uso de la API relacionadas con
 *                 los registros de ejercicios.       
 *    Contenido: 
 *          - addRecord: Funcion que realiza una petición post al servidor,
 *                       enfocada a la tabla de registro de ejercicios.
 *          - getRecordsFromUser: Funcion que realiza una petición GET al servidor,
 *                                enfocada a la tabla de registro de ejercicios.       
 * ---------------------------  
 */

import client from './client';

const endpoint = '/Records';

// Formato de definición de funciones:
// const metodo_api = (parametros) => client.<tipo_peticion>(ruta_relativa, parámetros);

const addRecord = record => client.post(endpoint, record);
const getRecordsFromUser = (email, offset) => client.get(endpoint+'/User/'+email+'/?offset='+offset);


export default {
    addRecord,
    getRecordsFromUser,
}
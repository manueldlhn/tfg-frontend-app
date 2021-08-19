/* ---------------------------
 *    Nombre del fichero: users.js
 *    Descripción: Fichero que contiene las funciones de uso de la API relacionadas con
 *                 las usuarios.        
 *    Contenido:
 *          - getUsers: Función que realiza una petición GET al servidor, para
 *                         obtener usuarios.
 *          - getUser: Función que realiza una petición GET al servidor, para
 *                        obtener un único usuario.
 *          - updateUser: Función que realiza una petición PUT al servidor, para
 *                           actualizar la información de un usuario.    
 * ---------------------------  
 */

import client from './client';

const endpoint='/User';

// Formato de definición de funciones:
// const metodo_api = (parametros) => client.<tipo_peticion>(ruta_relativa, parámetros);

const getUsers = offset => client.get(endpoint+'/?offset='+offset);
const getUser = Email => client.get(endpoint+'/'+Email);
const updateUser = user => client.put(endpoint+'/'+user.Email, user);

export default {
    getUsers,
    getUser,
    updateUser
};
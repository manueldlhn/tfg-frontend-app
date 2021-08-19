/* ---------------------------
 *    Nombre del fichero: auth.js
 *    Descripción: Contiene las funciones de uso de la API relacionadas con la autenticación y el registro       
 *    Contenido: 
 *          - login: Función que realiza una petición POST al servidor, enviando el Email y la Contraseña
 *          - register: Función que realiza una petición POST al servidor, enviando los datos de usuario.       
 * ---------------------------  
 */

import client from './client';

const endpoint = '/Auth';

// Formato de definición de funciones:
// const metodo_api = (parametros) => client.<tipo_peticion>(ruta_relativa, parámetros);

const login = (Email,Password) => client.post(endpoint + '/login', {Email, Password});
const register = user => client.post(endpoint + '/register', user);

export default {
    login,
    register,
};
/* ---------------------------
 *    Nombre del fichero: storage.js
 *    Descripción: Este fichero contiene las funciones necesarias para
 *                 operar con el token (JWT) del usuario.       
 *    Contenido:
 *          - storeToken: Función encargada de almacenar el token.
 *          - getToken: Función para obtener el token.
 *          - getUser: Función que extrae el usuario del token.
 *          - removeToken: Función que elimina el token.        
 * ---------------------------  
 */

import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';


const key = "authToken";

const storeToken = async authToken => {
    try {
        await SecureStore.setItemAsync(key, authToken);
    } catch (error) {
        console.log("Error storing the auth token", error);
    } 
};

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log("Error obtaining the auth token", error);
    }
};

const getUser = async () => {
    const token = await getToken();
    return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
    try {
        return await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log("Error deleting the auth token", error);
    }
};

export default {
    getToken,
    getUser,
    removeToken,
    storeToken,
};
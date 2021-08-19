/* ---------------------------
 *    Nombre del fichero: client.js
 *    Descripción: Este fichero crea el "cliente" API encargado de consumirla desde
 *                 la app. Además incorpora el token con el usuario cifrado en la
 *                 cabecera de todas las peticiones que se hagan durante el uso.       
 *    Contenido: 
 *          - apiClient: Objeto "cliente" para consumir la API.        
 * ---------------------------  
 */

import { create } from 'apisauce';
import authStorage from '../auth/storage';
import constants from '../config/constants.js';

const apiClient = create({
    baseURL: constants.SERVER_URL,
});

apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await authStorage.getToken();
    if(!authToken) return;
    request.headers["x-auth-token"] = authToken;
});

export default apiClient;
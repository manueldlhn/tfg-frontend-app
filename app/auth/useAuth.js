/* ---------------------------
 *    Nombre del fichero: useAuth.js
 *    Descripción: Este fichero se encarga de crear un hook personalizado
 *                 que se empleará para gestionar la autenticación del usuario
 *                 mientras se desplaza entre las diferentes vistas de la app.        
 *    Contenido:
 *          - user: Objeto usuario.
 *          - logIn: Función encargada de establecer en la app al usuario y su token,
 *                   esencial para la comunicación con la API.  
 *          - logOut: Función encargada de eliminar lo establecido en la función logIn.      
 * ---------------------------  
 */

import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";


/* --------------------------
 *    Nombre de la Función: useAuth
 *    Funcionamiento: Establece el contexto de autenticación e incorpora las 
 *                    funciones de logIn y logOut.
 *    Argumentos que recibe: Ninguno.
 *    Devuelve: Objeto que contiene:
 *                  - user: Objeto del usuario autenticado en la app.
 *                  - logIn: Función de inicio de sesión.
 *                  - logOut: Función de cierre de sesión.
 * --------------------------
 */
export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    /* --------------------------
    *    Nombre de la Función: logIn
    *    Funcionamiento: Decodifica el token y establece el usuario de la aplicación.
    *                    Además, almacena el token en authStorage.
    *    Argumentos que recibe: authToken: Token recibido del servidor.
    *    Devuelve: Nada (void).
    * --------------------------
    */
    const logIn = (authToken) => { 
        const user = jwtDecode(authToken);
        setUser(user);
        authStorage.storeToken(authToken);
    };

    /* --------------------------
    *    Nombre de la Función: logOut
    *    Funcionamiento: Elimina el usuario y el token del sistema.
    *    Argumentos que recibe: Ninguno.
    *    Devuelve: Nada (void).
    * --------------------------
    */
    const logOut = () => {
        setUser(null);
        authStorage.removeToken();
    };

    return { user, logIn, logOut };
    
};
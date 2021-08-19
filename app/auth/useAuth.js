import { useContext } from "react";
import jwtDecode from "jwt-decode";

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

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const logIn = (authToken) => { 
        const user = jwtDecode(authToken);
        setUser(user);
        authStorage.storeToken(authToken);
    };

    const logOut = () => {
        setUser(null);
        authStorage.removeToken();
    };

    return { user, logIn, logOut };
    
};
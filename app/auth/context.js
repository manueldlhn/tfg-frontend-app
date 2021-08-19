/* ---------------------------
 *    Nombre del fichero: context.js
 *    Descripción: Fichero que crea el AuthContext, necesario para mantener la
 *                 autenticación y acceder a sus parámetros en cada punto de la app.        
 *    Contenido:
 *          - AuthContext: Contexto relacionado con la autenticación.      
 * ---------------------------  
 */

import React from 'react';

const AuthContext = React.createContext();

export default AuthContext;
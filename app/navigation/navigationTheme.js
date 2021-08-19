/* ---------------------------
 *    Nombre del fichero: navigationTheme.js
 *    Descripción: Este fichero define el tema default de la app.       
 *    Contenido: 
 *          - ...DefaultTheme: Importado de la librería correspondiente.
 *          - colors: Objeto que recoge los colores del tema.       
 * ---------------------------  
 */

import {DefaultTheme} from '@react-navigation/native';
import colors from "../config/colors";

export default {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        background: colors.white,
    },
}
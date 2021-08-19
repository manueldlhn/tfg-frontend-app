/* ---------------------------
 *    Nombre del fichero: styles.js
 *    Descripción: Este fichero contiene los estilos por defecto de toda la app.       
 *    Contenido: Objeto que contiene:
 *                  - colors: colores del fichero colors.js
 *                  - text: Extilos default para el texto mostrado en la app.       
 * ---------------------------  
 */

import {Platform } from 'react-native';

import colors from './colors';

export default {
    colors,
    text: {
        color: colors.black,
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    },
};
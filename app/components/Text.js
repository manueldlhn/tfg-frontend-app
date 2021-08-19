/* ---------------------------
 *    Nombre del fichero: Text.js
 *    Descripción: Este fichero contiene el componente de Texto.       
 *    Contenido:
 *          - AppText: Función que recoge el aspecto del componente.        
 * ---------------------------  
 */

import React from 'react';
import { Text } from 'react-native';

import defaultStyles from '../config/styles';

/* --------------------------
 *    Nombre de la Función: AppText
 *    Funcionamiento: Renderiza el componente con los parámetros recibidos.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - children: Contenido del componente.
 *                              - style: Estilo del componente.
 *                              - ...otherProps: Otras propiedades que se puedan añadir.
 *    Devuelve:     
 * --------------------------
 */

function AppText({children, style, ...otherProps}) {
    return (
        <Text style={[defaultStyles.text, style]} {...otherProps}>
            {children}
        </Text>
    );
}

export default AppText;
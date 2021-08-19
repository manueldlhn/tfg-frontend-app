/* ---------------------------
 *    Nombre del fichero: Icon.js
 *    Descripción: Este fichero contiene el componente de Icono.        
 *    Contenido:
 *          - Icon: Función que define el aspecto del icono.        
 * ---------------------------  
 */

import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/* --------------------------
 *    Nombre de la Función: Icon
 *    Funcionamiento: Define el aspecto del icono en base a los parámetros recibidos.
 *    Argumentos que recibe: Objeto que contiene: 
 *                              - name: Nombre del icono.
 *                              - size: Tamaño del icono (40 si no se proporciona).
 *                              - backgroundColor: Color de fondo (#000 si no se proporciona).
 *                              - iconColor: Color del icono (#fff si no se proporciona).
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function Icon({ name, size = 40, backgroundColor = "#000", iconColor = "#fff" }) {
    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
        </View>
    );
}


export default Icon;
/* ---------------------------
 *    Nombre del fichero: Button.js
 *    Descripción: Este fichero contiene el componente del botón.        
 *    Contenido: 
 *          - AppButton: Función que recoge el aspecto y funcionamiento del componente.       
 * ---------------------------  
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from '../config/colors';


/* --------------------------
 *    Nombre de la Función: AppButton
 *    Funcionamiento: Renderiza el botón.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - title: Titulo del botón
 *                              - onPress: Función que regula el comportamiento al pulsar el botón.
 *                              - color: Color del botón (Primary si no se proporciona uno).
 *                              - fontColor: Color del texto que contiene (Blanco si no se proporciona uno).
 *                              - borderColor: Color del borde del botón. (Ninguno si no se proporciona uno).
 *                              - borderWidth: Ancho del borde del botón. (Ninguno si no se proporciona uno).
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function AppButton({title, onPress, color="primary", fontColor="white", borderColor="", borderWidth=0}) {
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: colors[color], borderWidth: borderWidth, borderColor: colors[borderColor]}]}
            onPress={onPress}
        >
            <Text style={[styles.text, {color: colors[fontColor]}]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: "100%",
        marginVertical: 10,
    },
    text: {
        color: colors.white,
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
    }
})

export default AppButton;
/* ---------------------------
 *    Nombre del fichero: ErrorMessage.js
 *    Descripción: Este fichero contiene el componente de mensaje de error para formularios.       
 *    Contenido:
 *          - ErrorMessage: Función que define el aspecto y comportamiento del componente.        
 * ---------------------------  
 */

import React from 'react';
import { StyleSheet } from 'react-native';


import colors from '../../config/colors';
import Text from '../Text';

/* --------------------------
 *    Nombre de la Función: ErrorMessage
 *    Funcionamiento: Define la vista y el comportamiento del mensaje de error.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - error: Mensaje de error.
 *                              - visible: Flag que hace que el mensaje se muestre o no.
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function ErrorMessage({error, visible}) {
    if(!visible || !error) return null;
    return <Text style={styles.error}>{error}</Text>
}

const styles = StyleSheet.create({
    error:{
        color: colors.red,
    }
})

export default ErrorMessage;
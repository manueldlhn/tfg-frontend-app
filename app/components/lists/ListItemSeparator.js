/* ---------------------------
 *    Nombre del fichero: ListItemSeparator.js
 *    Descripción: Este fichero contiene el componente ListItemSeparator        
 *    Contenido:
 *          - ListItemSeparator: Función que recoge el aspecto del separador de elemento de lista.        
 * ---------------------------  
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../../config/colors';


/* --------------------------
 *    Nombre de la Función: ListItemSeparator
 *    Funcionamiento: Renderiza el componente.
 *    Argumentos que recibe: Ninguno
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function ListItemSeparator() {
    return (
        <View style={styles.separator}>
            
        </View>
    );
}

const styles = StyleSheet.create({
    separator: {
        width: "100%",
        height: 3,
        backgroundColor: colors.lightprimary,
    },
})

export default ListItemSeparator;
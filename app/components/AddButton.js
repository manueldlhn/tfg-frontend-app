/* ---------------------------
 *    Nombre del fichero: AddButton.js
 *    Descripción: Este fichero contiene el componente de Botón de añadir.        
 *    Contenido: 
 *          - AddButton: Función que recoge el aspecto y comportamiento del botón de añadir.       
 * ---------------------------  
 */

import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';


import colors from '../config/colors';
import Icon from './Icon';


/* --------------------------
 *    Nombre de la Función: AddButton
 *    Funcionamiento: Define el aspecto y funcionamiento del botón.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - onPress: Función que define el comportamiento al pulsar el botón.
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function AddButton({onPress}) {
    return (
        <View style={styles.addButton}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View>
                    <Icon 
                        name="plus-thick"
                        size={50}
                        backgroundColor={colors.secondary}
                        color={colors.white}
                    />
                </View>    
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: "5%",
        right: "10%",
        borderColor: colors.white,
        borderWidth: 2,
        borderRadius: 30
    },
})

export default AddButton;
/* ---------------------------
 *    Nombre del fichero: PrescriptionCard.js
 *    Descripción: Este fichero contiene el componente de la tarjeta de Prescripción,
 *                 así como la lógica que incorpora.       
 *    Contenido:
 *          - PrescriptionCard: Función que recoge el aspecto y funcionamiento de la tarjeta en cuestión.        
 * ---------------------------  
 */

import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';

/* --------------------------
 *    Nombre de la Función: PrescriptionCard
 *    Funcionamiento: Renderiza la vista de la tarjeta y define su comportamiento ante ciertos eventos.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - type: Tipo de la prescripción (Rutina, Ejercicio).
 *                              - id: Identificador del elemento prescrito.
 *                              - Nombre: Nombre del elemento prescrito.
 *                              - Comentarios: Comentarios del especialista que prescribe.
 *                              - onPress: Función a ejecutarse cuando se pulsa en la tarjeta.
 *    Devuelve: El componente renderizado.
 * --------------------------
 */


function PrescriptionCard({ type, id, Nombre, Comentarios, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Icon
                    name={type == "Rutina" ? "text-box-multiple" : "karate" }
                    iconColor={colors.gold}
                    backgroundColor={colors.black}
                />
                <View style={styles.info}>
                    <Text style={styles.id}>{Nombre+" (ID: "+id+")"}</Text>
                    <Text style={styles.comments} numberOfLines={1}>{"Comentarios: "+ Comentarios==null ? "Ninguno." : Comentarios}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 10,
        padding: 20,
        flexDirection: "row",
    },
    comments: {
        color: colors.grey,
    },
    id: {
        fontWeight: "bold",
    },
    info:{
        paddingLeft: 10,
        flex: 1,
    }
})

export default PrescriptionCard;
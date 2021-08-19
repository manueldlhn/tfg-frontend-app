/* ---------------------------
 *    Nombre del fichero: WorkoutCard.js
 *    Descripción: Este fichero contiene el componente de la tarjeta de ejercicio,
 *                 así como la lógica que incorpora.       
 *    Contenido:
 *          - WorkoutCard: Función que recoge el aspecto y el funcionamiento de la 
 *                         tarjeta de ejercicio.        
 * ---------------------------  
 */

import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import useAuth from '../../auth/useAuth';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';

/* --------------------------
 *    Nombre de la Función: WorkoutCard
 *    Funcionamiento: Renderiza la vista de la tarjeta y define su comportamiento ante ciertos eventos.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - ej_id: Identificador de ejercicio.
 *                              - Nombre: Nombre del ejercicio.
 *                              - Subtitulo: Subtitulo del ejercicio.
 *                              - Descripcion: Descripcion del ejercicio.
 *                              - onPress: Función que recoge el comportamiento al pulsar en la tarjeta.
 *    Devuelve: El componente renderizado.
 * --------------------------
 */


function WorkoutCard({ ej_id, Nombre, Subtitulo, Descripcion, onPress }) {
    const {user} = useAuth();
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Icon 
                    name="dumbbell" 
                    iconColor={colors.secondary} 
                    backgroundColor={colors.lightgreen}/>
                <View style={styles.info}>
                    {/* Ocultamos el identificador al rol usuario, no le hace falta. */}
                    {user.Rol == "Especialista" && <Text style={styles.id}>{"ID: "+ej_id}</Text>} 
                    <Text style={styles.title}>{Nombre}</Text>
                    <Text style={styles.description} numberOfLines={1} >{Descripcion}</Text>
                    <Text style={styles.subTitle}>{"Creado por: "+Subtitulo}</Text>
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
        flexDirection: "row"
    },
    info: {
        paddingLeft: 10,
        flex: 1
    }, 
    id: {
        position: "absolute",
        right: 0,
        top: -10,
        fontSize: 15,
        color: colors.darkred,
        fontWeight: "bold",
    },
    title: {
        fontWeight: "bold",
    },
    time: {
        position: 'absolute',
        top: 15,
        right: 15,
        color: colors.primary,
        alignSelf: 'flex-end'
    },
    subTitle: {
        color: colors.grey
    }
})

export default WorkoutCard;
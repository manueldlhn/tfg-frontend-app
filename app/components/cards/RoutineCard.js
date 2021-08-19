/* ---------------------------
 *    Nombre del fichero: RoutineCard.js
 *    Descripción: Este fichero contiene el componente de la tarjeta de rutina,
 *                 así como la lógica que incorpora.       
 *    Contenido:
 *          - RoutineCard: Función que recoge el aspecto y el funcionamiento de la 
 *                         tarjeta de rutina.        
 * ---------------------------  
 */

import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import useAuth from '../../auth/useAuth';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';


/* --------------------------
 *    Nombre de la Función: RoutineCard
 *    Funcionamiento: Renderiza la vista de la tarjeta y define su comportamiento ante ciertos eventos.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - rut_id: Identificador de rutina.
 *                              - Nombre: Nombre de la rutina.
 *                              - Descripcion: Descripcion de la rutina.
 *                              - Info_Rutina: Información sobre la rutina.
 *                              - onPress: Función que recoge el comportamiento al pulsar en la tarjeta.
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function RoutineCard({ rut_id, Nombre, Descripcion, Info_Rutina, onPress}) {
    const {user} = useAuth();
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Icon 
                    name="weight-lifter" 
                    iconColor={colors.secondary} 
                    backgroundColor={colors.lightgreen}/>
                <View style={styles.info}>
                    {/* Ocultamos el identificador al rol usuario, no le hace falta. */}
                    {user.Rol == "Especialista" && <Text style={styles.id}>{"ID: "+rut_id}</Text>}
                    <Text style={styles.name}>{Nombre}</Text>
                    <Text numberOfLines={1}>{Descripcion}</Text>
                    <Text style={styles.description}>{"Creada por: "+Info_Rutina}</Text>
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
    info: {
        paddingLeft: 10,
        flex: 1,
    },
    id: {
        position: "absolute",
        right: 0,
        top: -10,
        fontSize: 15,
        color: colors.darkred,
        fontWeight: "bold",
    },
    name: {
        fontWeight: "bold",
    },
    description: {
        color: colors.grey,
    },
    
})

export default RoutineCard;
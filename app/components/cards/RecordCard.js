/* ---------------------------
 *    Nombre del fichero: RecordCard.js
 *    Descripción: Este fichero contiene el componente de la tarjeta de ejercicio realizado,
 *                 así como la lógica que incorpora.
 *    Contenido:
 *          - RecordCard: Función que recoge el aspecto y el funcionamiento de la 
 *                         tarjeta de ejercicio realizado.        
 * ---------------------------  
 */

import React, {useState} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';


/* --------------------------
 *    Nombre de la Función: RecordCard
 *    Funcionamiento: Renderiza la vista de la tarjeta y define su comportamiento ante ciertos eventos.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - ej_id: Identificador del ejercicio.
 *                              - ej_Nombre: Nombre del ejercicio.
 *                              - rut_id: Identificador de la rutina a la que pertenece (si procede).
 *                              - rut_Nombre: Nombre de la rutina a la que pertenece (si procede).
 *                              - Fecha_Hora: Momento en que el usuario comenzó el ejercicio.
 *                              - Tiempo_ejercicio: Tiempo que el usuario pasó realizando el ejercicio.
 *                              - Info_adicional: Información extra, como datos de los sensores (si procede).
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function RecordCard({ ej_id, ej_Nombre, rut_id, rut_Nombre, Fecha_Hora, Tiempo_ejercicio, Info_Adicional }) {
    // Definimos un hook para controlar si la tarjeta está expandida con la información adicional.
    const [expanded, setExpanded] = useState(false);
    // Definimos el comportamiento al presionar la tarjeta.
    const onPress = () => {
        // Si está expandida, se contrae. Si está contraída, se expande.
        setExpanded(expanded=>!expanded);
    }

    
    
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Icon
                    name="text-box"
                    iconColor={colors.white}
                    backgroundColor={colors.secondary}
                />
                <View style={styles.info}>
                    <Text style={styles.identifier}>{ej_Nombre+" (ID: "+ej_id+")"+( rut_id != null ? "\nRutina: "+rut_Nombre+" (ID: "+rut_id+")" : "" )}</Text>
                    <Text style={styles.datetime}>{Fecha_Hora}</Text>
                    {expanded &&
                    <>
                    <Text style={styles.moreInfo}>{"Tiempo empleado: "+Tiempo_ejercicio}</Text>
                    {(Info_Adicional != null && Info_Adicional != "") && <Text style={styles.moreInfo}>{"Información Adicional: \n"+Info_Adicional}</Text>} 
                    </>
                    }
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
        padding: 10,
        flexDirection: "row",
    },
    info: {
        paddingLeft: 10,
        flexDirection: "column",
    },
    identifier: {
        fontWeight: "bold",
        paddingBottom: 10,
        marginRight: 10,
    },
    datetime: {
        color: colors.grey,
        paddingBottom: 5,
    },
    moreInfo: {
        color: "indigo",
    }

})

export default RecordCard;
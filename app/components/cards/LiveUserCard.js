/* ---------------------------
 *    Nombre del fichero: LiveUserCard.js
 *    Descripción: Este fichero contiene el componente de la tarjeta de usuario cuando
 *                 se encuentra realizando un ejercicio, así como la lógica que incorpora.        
 *    Contenido:
 *          - LiveUserCard: Función que recoge el aspecto y el funcionamiento de la tarjeta
 *                          de usuario cuando se encuentra realizando un ejercicio.        
 * ---------------------------  
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';

/* --------------------------
 *    Nombre de la Función: LiveUserCard
 *    Funcionamiento: Renderiza la vista de la tarjeta y define su comportamiento ante ciertos eventos.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - Usuario: Email del usuario.
 *                              - Nombre_ej: Nombre del ejercicio que está realizando.
 *                              - Tiempo_ej: Tiempo que lleva realizando el ejercicio.
 *                              - Ultimo_msg: Flag boolean que indicará cuándo ha terminado.
 *                              - Distancia: Número que indica la distancia recorrida por el usuario (metros).
 *                              - Pasos: Número que indica los pasos que ha recorrido el usuario.
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function LiveUserCard({ Usuario, Nombre_ej, Tiempo_ej, Ultimo_msg, Distancia, Pasos }) {
    // Definimos un hook para controlar si la tarjeta está expandida o no.
    const [expanded, setExpanded] = useState(false);
    // Definimos el comportamiento al presionar la tarjeta.
    const onPress = () => {
        if(Distancia == null && Pasos == null) // Si no hay información de Distancia o Pasos (No se muestra sin expandir).
            return alert("Este ejercicio no tiene información adicional que mostrar");
        setExpanded(expanded => !expanded);
    }
    
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Icon
                    name="radiobox-marked"
                    iconColor={Ultimo_msg ? colors.grey : colors.secondary }
                    backgroundColor={colors.white}
                />
                <View style={styles.info}>
                    <Text style={styles.user}>{Usuario}</Text>
                    <Text style={styles.nombre_ej}>{Nombre_ej}</Text>
                    <View style={styles.sensorsView}> {/* Sólo se mostrará si la tarjeta está expandida */}
                        {(expanded && Distancia != null) && <Text style={styles.sensors}>{"Distancia: "+Distancia+"m"}</Text>}
                        {(expanded && Pasos != null) && <Text style={styles.sensors}>{"Pasos: "+Pasos}</Text>}
                    </View>
                    
                </View>
                <View style={styles.tiempoView}>
                    <Text style={styles.tiempo_ej}>{Tiempo_ej}</Text>
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
    user: {
        fontWeight: "bold",
    },
    info: {
        paddingLeft: 10,
        flexDirection: "column",
    },  
    nombre_ej: {
        color: colors.grey,
        paddingTop: 10,
    },
    tiempoView: {
        position: "absolute",
        right: 20,
        top: 10,
    },
    tiempo_ej: {
        color: "indigo",
        fontWeight: "bold",
    },
    sensors: {
        color: colors.primary,
        paddingRight: 10,
    },
    sensorsView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
    },
})

export default LiveUserCard;
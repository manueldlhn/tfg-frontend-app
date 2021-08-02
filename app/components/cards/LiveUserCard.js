import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';

function LiveUserCard({ Usuario, Nombre_ej, Tiempo_ej, Ultimo_msg, Distancia, Pasos }) {
    const [expanded, setExpanded] = useState(false);
    const onPress = () => {
        console.log("Pulsado usuario. "+expanded);
        if(Distancia == null && Pasos == null) 
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
                    <View style={styles.sensorsView}>
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
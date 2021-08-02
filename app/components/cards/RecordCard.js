import React, {useState} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';

function RecordCard({ ej_id, ej_Nombre, rut_id, rut_Nombre, Fecha_Hora, Tiempo_ejercicio, Info_Adicional }) {
    const [expanded, setExpanded] = useState(false);
    
    const onPress = () => {
        console.log("Pulsado registro.");
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
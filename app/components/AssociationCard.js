import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import colors from '../config/colors';
import Icon from './Icon';
import Text from './Text';

function AssociationCard({ EJERCICIO_ej_id, RUTINA_rut_id, USUARIOS_Email, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Icon 
                    name="file-document"
                    iconColor={colors.gold}
                    backgroundColor={colors.black}
                />
                <View style={styles.info}>
                    <Text style={styles.rut_ej}>{"Rutina: "+RUTINA_rut_id+" - Ejercicio: "+EJERCICIO_ej_id}</Text>
                    <Text style={styles.email}>{USUARIOS_Email}</Text>
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
    rut_ej: {

    },
    email: {
        color: colors.grey,
    }
})

export default AssociationCard;
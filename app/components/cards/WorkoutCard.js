import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';

function WorkoutCard({ ej_id, Nombre, Subtitulo, Descripcion, Estado_forma, Pub_priv, RUTINA_USUARIOS_Email, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Icon 
                    name="dumbbell" 
                    iconColor={Pub_priv ? colors.secondary : colors.grey} 
                    backgroundColor={Pub_priv ? colors.lightgreen: colors.lightgrey}/>
                <View style={styles.info}>
                    <Text style={styles.id}>{"ID: "+ej_id}</Text>
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
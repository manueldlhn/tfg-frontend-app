import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import useAuth from '../../auth/useAuth';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';

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
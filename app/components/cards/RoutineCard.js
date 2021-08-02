import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import useAuth from '../../auth/useAuth';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';

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
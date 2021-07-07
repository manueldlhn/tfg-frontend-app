import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import colors from '../config/colors';
import Icon from './Icon';
import Text from './Text';


function UserCard({ Email, Nombre, Enabled, Rol, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Icon 
                    name={Rol=="Especialista"? "account-tie" : "account"} 
                    iconColor={Enabled ? colors.secondary : colors.grey} 
                    backgroundColor={Enabled ? colors.lightgreen : colors.lightgrey}/>
                <View style={styles.info}>
                    <Text style={styles.name}>{Nombre}</Text>
                    <Text style={styles.email}>{Email}</Text>
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
    name: {
        fontWeight: "bold",
    },
    email: {
        color: colors.grey,
    },
    info: {
        paddingLeft: 10
    }

})

export default UserCard;
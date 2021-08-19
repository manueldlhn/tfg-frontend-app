/* ---------------------------
 *    Nombre del fichero: UserCard.js
 *    Descripción: Este fichero contiene el componente de la tarjeta de usuario,
 *                 así como la lógica que incorpora.       
 *    Contenido:
 *          - UserCard: Función que recoge el aspecto y el funcionamiento de la 
 *                         tarjeta de usuario.        
 * ---------------------------  
 */

import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import colors from '../../config/colors';
import Icon from '../Icon';
import Text from '../Text';


/* --------------------------
 *    Nombre de la Función: UserCard
 *    Funcionamiento: Renderiza la vista de la tarjeta y define su comportamiento ante ciertos eventos.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - Email: Email de usuario.
 *                              - Nombre: Nombre del usuario.
 *                              - Rol: Rol del usuario.
 *                              - onPress: Función que recoge el comportamiento al pulsar en la tarjeta.
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function UserCard({ Email, Nombre, Rol, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                {/* Se utilizará un icono diferente para distinguir usuario de especialista. */}
                <Icon 
                    name={Rol=="Especialista"? "account-tie" : "account"} 
                    iconColor={(Rol=="Especialista" ? colors.primary : colors.secondary )} 
                    backgroundColor={colors.lightgreen}/>
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
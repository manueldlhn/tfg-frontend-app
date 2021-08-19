/* ---------------------------
 *    Nombre del fichero: ListItem.js 
 *    Descripción: Este fichero contiene el componente ListItem.       
 *    Contenido:
 *          - ListItem: Función que define el aspecto y el comportamiento de un elemento de lista.        
 * ---------------------------  
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import colors from '../../config/colors';
import Text from '../Text';


/* --------------------------
 *    Nombre de la Función: ListItem
 *    Funcionamiento: Renderiza el componente.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - title: Titulo del elemento.
 *                              - subTitle: Subtítulo del elemento.
 *                              - IconComponent: Icono que se mostrará a la izquierda.
 *                              - onPress: Función que define el comportamiento al pulsar.
 *                              - renderRightActions: Función que define el comportamiento
 *                                                    al deslizar a la derecha. (En la última
 *                                                    versión de la app no se usa).
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function ListItem({ title, subTitle, IconComponent, onPress, renderRightActions }) {
    return (
        <Swipeable renderRightActions={renderRightActions} >
            <TouchableHighlight underlayColor={colors.lightgrey} onPress={onPress}>
                <View style={styles.container}>
                    {IconComponent}
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title} numberOfLines={1}>
                            {title}
                        </Text>
                        {subTitle && (
                            <Text style={styles.subTitle} numberOfLines={2}>
                                {subTitle}
                            </Text>
                        )}
                    </View>
                    <MaterialCommunityIcons 
                        color={colors.grey}
                        name="chevron-right"
                        size={25}
                    />
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        backgroundColor: colors.white,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
    },
    subTitle: {
        color: colors.grey,
    }

})

export default ListItem;
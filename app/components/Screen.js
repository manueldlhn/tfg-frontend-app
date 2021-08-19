/* ---------------------------
 *    Nombre del fichero: Screen.js
 *    Descripción: Este fichero contiene el componente de la Screen (pantalla).        
 *    Contenido:  
 *          - Screen: Función que recoge el aspecto del componente.      
 * ---------------------------  
 */

import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import colors from '../config/colors';



/* --------------------------
 *    Nombre de la Función: Screen
 *    Funcionamiento: Renderiza el componente en base a los parámetros recibidos.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - children: Elementos que se incluirán en la pantalla.
 *                              - style: Estilos de la pantalla.
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function Screen({children, style}) {
    return (
        <>
        <StatusBar style="light" backgroundColor={colors.primary} />
        <SafeAreaView style={styles.screen}>
            <View style={[styles.view, style]}>
                {children}
            </View>
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        
    },
    view: {
        flex: 1,
    }
})

export default Screen;
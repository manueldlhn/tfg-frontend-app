/* ---------------------------
 *    Nombre del fichero: AboutScreen.js
 *    Descripción: Este fichero contiene la vista de "Acerca de".        
 *    Contenido:        
 *          - AboutScreen: Función que renderiza la vista de "Acerca de".
 * ---------------------------  
 */

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Screen from '../components/Screen';
import Text from '../components/Text';
import colors from '../config/colors';


/* --------------------------
 *    Nombre de la Función: AboutScreen
 *    Funcionamiento: Renderiza la vista de "Acerca de".
 *    Argumentos que recibe: Ninguno
 *    Devuelve: La vista renderizada.
 * --------------------------
 */
function AboutScreen() {
    return (
        <Screen style={styles.container}>
            <View style={styles.info}>
                <Image 
                    source={require('../assets/logo.png')}
                    style={styles.logo}/>
                <Text style={{
                    fontStyle:"italic",
                    textAlign: "center",
                    fontSize:20,
                }}
                >{
                    "RemGym es un servicio desarrollado como Trabajo de Fin de Grado.\n\n"+
                    "Autor: Manuel de la Haba Navarro\n"+
                    "Tutora del trabajo: Mª Teresa Ariza Gómez (Profesora Titular)\n\n"+
                    "Grado en Ingeniería de las Tecnologías de Telecomunicación\n"+
                    "Escuela Técnica Superior de Ingeniería\n"+"Universidad de Sevilla\n\n\n"+
                    "Contacto: manuel@alum.us.es\n\n\n"+
                    "2021"
                }</Text>
            </View>
            <View style={styles.notice}>
                <Text style={{ 
                    textAlign: "center", 
                    fontStyle:"italic", 
                    fontWeight: "bold",
                    fontSize:15 
                }}
                >
                    La administración del servicio no se hace responsable del uso que se haga del mismo.
                </Text>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    info:{
        position: "absolute",
        top: 30,
        padding:20,
        alignItems: "center",
        justifyContent:"center",
    },
    notice:{
        position: "absolute",
        bottom: 30,
        padding:20,
        alignItems: "center",
        justifyContent:"center",
    },
    logo: {
        height: 80,
        width: 80,
        alignSelf: "center",
        marginTop: -20,
        marginBottom: 20,
    }
})

export default AboutScreen;
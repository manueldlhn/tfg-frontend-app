import React from 'react';
import { View, StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import Text from '../components/Text';
import colors from '../config/colors';

function AboutScreen(props) {
    return (
        <Screen style={styles.container}>
            <View style={styles.info}>
                <Text style={{
                    fontStyle:"italic",
                    textAlign: "center",
                    fontSize:20,
                }}
                >{
                    "Servicio desarrollado como Trabajo de Fin de Grado.\n\n"+
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
    }
})

export default AboutScreen;
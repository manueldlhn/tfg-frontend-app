import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import colors from '../config/colors';

function WelcomeScreen({navigation}) {
    return (
        <ImageBackground 
            blurRadius={1}
            source={require('../assets/background.jpg')}
            style={styles.background}
        >
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../assets/logo.png')}
                    style={styles.logo}/>
                <Text style={styles.tagline}>GYM ONLINE</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    title="Iniciar Sesión"
                    onPress={() => navigation.navigate("Iniciar Sesión")}
                />
                <Button
                    title="Registrarse"
                    color="secondary"
                    onPress={() => navigation.navigate("Registrarse")}
                />

            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonsContainer: {
        padding: 20,
        width: "100%",
    },
    logo:{ 
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: 'absolute',
        top: 70,
        alignItems: 'center',
    },
    tagline: {
        fontSize: 25,
        fontWeight: "bold",
        paddingVertical: 20,
        color: colors.white,
        textShadowColor: colors.black,
        textShadowRadius:5,
        textShadowOffset: {width: 1, height: 1}
    }
});

export default WelcomeScreen;
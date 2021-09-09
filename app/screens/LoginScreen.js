/* ---------------------------
 *    Nombre del fichero: LoginScreen.js
 *    Descripción: Este fichero contiene la pantalla del formulario de login.        
 *    Contenido:  
 *          - LoginScreen: Función que renderiza la vista de login y regula su comportamiento
 *                         ante ciertos eventos.      
 * ---------------------------  
 */

import React, { useState } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import * as Yup from "yup";


import { Form, FormField, SubmitButton } from '../components/forms';
import Screen from '../components/Screen';
import colors from '../config/colors';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';


/* --------------------------
 *    Nombre: validationSchema
 *    Descripción: Este objeto impone las restricciones de los campos
 *                 del formulario para que se pueda proceder al submit.
 * -------------------------- 
 */
const validationSchema = Yup.object().shape({
    Email: Yup.string().required().email().label("Email"),
    Password: Yup.string().required().min(4).label("Password"),
});

/* --------------------------
 *    Nombre de la Función: LoginScreen
 *    Funcionamiento: Define la vista y el comportamiento del fomrulario de Login.
 *    Argumentos que recibe: Ninguno
 *    Devuelve: La pantalla renderizada.
 * --------------------------
 */
function LoginScreen() {
    // Obtenemos el objeto auth de useAuth.
    const auth = useAuth();

    /* --------------------------
    *    Nombre de la Función: handleSubmit
    *    Funcionamiento: Se encarga de extraer la información de los campos y enviarla al servidor.
    *    Argumentos que recibe: Objeto que contiene
    *                               - Email: Dirección de correo del usuario
    *                               - Password: Contraseña del usuario.
    *    Devuelve: Si no ha habido error, nada. Si ha habido un error, devuelve un mensaje de alert.
    * --------------------------
    */
    const handleSubmit = async ({Email, Password}) => {
        // Realizamos la petición a la API.
        const result = await authApi.login(Email, Password);
        if(!result.ok) { // Ha habido un error ajeno al proceso de comprobación.
            return Alert.alert("Error","Ha habido un error al iniciar sesión. Pruebe más tarde.");
        } else if (!result.data.ok) { // Credenciales incorrectas.
            return Alert.alert("Error",result.data.message);
        } else { // Todo bien
            auth.logIn(result.data.accessToken);
        }
    }
    return (
        <Screen style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../assets/logo-inv.png')} 
            />
            <Form
                initialValues={{Email:"", Password: ""}}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormField 
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="Email"
                    placeholder="Correo Electrónico"
                    textContentType="emailAddress" // Solo para iOS
                />
                <FormField 
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="Password"
                    placeholder="Contraseña"
                    secureTextEntry
                    textContentType="password" // Sólo para iOS
                />
                <SubmitButton title="Iniciar Sesión"/>
            </Form>
                
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logo:{
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
})

export default LoginScreen;
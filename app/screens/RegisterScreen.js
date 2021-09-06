/* ---------------------------
 *    Nombre del fichero: RegisterScreen.js
 *    Descripción: Este fichero contiene la pantalla del formulario de registro.        
 *    Contenido:  
 *          - RegisterScreen: Función que renderiza la vista de registro y regula su comportamiento
 *                         ante ciertos eventos.      
 * ---------------------------  
 */

import React from "react";
import { StyleSheet, Alert } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import authApi from "../api/auth";
import routes from "../navigation/routes";


/* --------------------------
 *    Nombre: validationSchema
 *    Descripción: Este objeto impone las restricciones de los campos
 *                 del formulario para que se pueda proceder al submit.
 * -------------------------- 
 */
const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required().label("Nombre"),
    Fecha_Nacimiento: Yup.date().required().label("Fecha_Nacimiento"),
    Telefono: Yup.string().required().min(9).max(9).label("Telefono"),
    Email: Yup.string().required().email().label("Email"),
    Password: Yup.string().required().min(4).label("Password"),
  });


/* --------------------------
 *    Nombre de la Función: RegisterScreen
 *    Funcionamiento: Define la vista y el comportamiento del fomrulario del registro.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - navigation: Objeto de navegación. Se usará para cambiar de vista.
 *    Devuelve: La pantalla renderizada.
 * --------------------------
 */
function RegisterScreen({navigation}) {

    /* --------------------------
    *    Nombre de la Función: handleSubmit
    *    Funcionamiento: Se encarga de extraer la información de los campos y enviarla al servidor.
    *    Argumentos que recibe: 
    *           - user: Objeto con los datos de los campos del formulario.
    *    Devuelve: Si no ha habido error, nada. Si ha habido un error, devuelve un mensaje de alert.
    * --------------------------
    */
    const handleSubmit = async ( user ) => {
        // Realizamos una llamada a la API
        const result = await authApi.register(user);
        // Informamos con la respuesta.
        const info = result.ok ? result.data.message : "Ha habido un error al realizar el registro";
        Alert.alert("Error en el registro",info);

        // Volvemos a la pantalla de bienvenida.
        result.data.ok && navigation.reset({
            index: 0,
            routes: [{ name: routes.WELCOME }]
        });
    }

    return (
        <Screen style={styles.container} >
            <Form
                initialValues={{ Nombre:"", Fecha_Nacimiento:"", Telefono:"", Email:"", Password:"" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormField 
                    autoCorrect={false}
                    icon="account"
                    name="Nombre"
                    placeholder="Nombre y Apellidos"
                />
                <FormField 
                    autoCapitalize="none"
                    icon="calendar"
                    name="Fecha_Nacimiento"
                    placeholder="Fecha de nacimiento (AAAA-MM-DD)"
                    keyboardType="number-pad"
                />    
                <FormField 
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="phone"
                    keyboardType="phone-pad"
                    name="Telefono"
                    placeholder="Número de teléfono"
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="Email"
                    placeholder="Correo Electrónico"
                    textContentType="emailAddress"
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="Password"
                    placeholder="Contraseña"
                    secureTextEntry
                    textContentType="password"
                />
                <SubmitButton title="Registrarse" color={"secondary"} />
            </Form>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
});

export default RegisterScreen;
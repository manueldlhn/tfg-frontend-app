/* ---------------------------
 *    Nombre del fichero: CreateRoutineScreen.js 
 *    Descripción: Este fichero contiene la vista de "Crear/Modificar Rutina".        
 *    Contenido: 
 *          - CreateRoutineScreen: Función que renderiza la vista de "Crear/Modificar rutina" y su
 *                                 comportamiento ante ciertos eventos.     
 * ---------------------------  
 */

import React from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import routinesApi from '../api/routines';
import routes from "../navigation/routes";


/* --------------------------
 *    Nombre: validationSchema
 *    Descripción: Este objeto impone las restricciones de los campos
 *                 del formulario para que se pueda proceder al submit.
 * -------------------------- 
 */
const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required().max(100).label("Nombre"),
    Descripcion: Yup.string().required().max(1000).label("Descripcion"),
    Info_Rutina: Yup.string().required().max(500).label("Info_Rutina"),
    USUARIOS_Email: Yup.string().required().max(45).email().label("USUARIOS_Email")
});



/* --------------------------
 *    Nombre de la Función: CreateRoutineScreen
 *    Funcionamiento: Define la vista y el comportamiento del formulario
 *                    de crear o modificar una rutina.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - route: Objeto ruta, se empleará para extraer los parámetros.
 *                              - navigation: Objeto de navegación, para cambiar de pantalla.
 *    Devuelve: La vista renderizada.
 * --------------------------
 */
function CreateRoutineScreen({ route, navigation }) {
    // Extraemos los parámetros de route
    params = route.params;

    /* --------------------------
    *    Nombre de la Función: handleSubmit
    *    Funcionamiento: Se encarga de extraer la información de los campos y enviarla al servidor.
    *    Argumentos que recibe: 
    *           - values: Objeto con los valores de los campos del formulario.
    *    Devuelve: Si no ha habido error, nada. Si ha habido un error, devuelve un mensaje de alert.
    * --------------------------
    */
    const handleSubmit = async (routine) => {
        // Si existe rut_id en los parámetros de route, se sobrescribe el valor del formulario.
        if( "rut_id" in params)
            routine.rut_id = params.rut_id;
        // Cargamos los datos en el servidor por medio de la API. OJO
        const result = await ("rut_id" in routine ?  routinesApi.updateRoutine(routine) : routinesApi.createRoutine(routine));
        
        if(!result.ok)
            return Alert.alert("Error",result.data.message);
        Alert.alert("Éxito","Rutina almacenada con éxito");
        navigation.reset({
            index: 0,
            routes: [{ name: routes.LISTING_ROUTINES }]
        });
    };

    return (
        <Screen style={styles.container} >
            <ScrollView>
                <Form
                    initialValues={{ 
                        Nombre: params.Nombre ? params.Nombre : "" , 
                        Descripcion: params.Descripcion ? params.Descripcion : "", 
                        Info_Rutina: params.Info_Rutina,
                        USUARIOS_Email: params.USUARIOS_Email 
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <FormField 
                        name="Nombre"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Nombre"
                        
                    />
                    <FormField 
                        name="Descripcion"
                        autoCapitalize="none"
                        placeholder="Descripción"
                        multiline={true}
                        numberOfLines={4}
                    />
                    <FormField 
                        name="Info_Rutina"
                        autoCapitalize="none"
                        placeholder="Información"
                        multiline={true}
                        numberOfLines={2}
                        editable={false}
                    />
                    <FormField 
                        name="USUARIOS_Email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Correo Electrónico"
                        keyboardType="email-address"
                        editable={false}
                    />

                    <SubmitButton title="Enviar Rutina" color={"secondary"} />
                </Form>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
})

export default CreateRoutineScreen;
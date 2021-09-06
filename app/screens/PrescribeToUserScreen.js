/* ---------------------------
 *    Nombre del fichero: PrescribeToUserScreen.js
 *    Descripción: Este fichero contiene la vista del formulario de "Añadir Prescripción a Usuario".         
 *    Contenido:
 *          - PrescribeToUserScreen: Función que renderiza la vista del formulario y regula su
 *            comportamiento ante eventos.
 * ---------------------------  
 */

import React from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import * as Yup from "yup";

import Screen from '../components/Screen';
import { Form, FormField, SubmitButton } from '../components/forms';
import prescriptionsApi from '../api/prescriptions';

/* --------------------------
 *    Nombre: validationSchema
 *    Descripción: Este objeto impone las restricciones de los campos
 *                 del formulario para que se pueda proceder al submit.
 * -------------------------- 
 */
const validationSchema = Yup.object().shape({
    usuario_email: Yup.string().required().max(45).email().label("usuario_email"),
    id: Yup.number().required().positive().integer().label("id"),
    especialista_email: Yup.string().required().max(45).email().label("especialista_email"),
    Comentarios: Yup.string().required().max(100).label("Comentarios"),
});

/* --------------------------
 *    Nombre de la Función: PrescribeToUserScreen
 *    Funcionamiento: Define la vista y el comportamiento del formulario
 *                    de prescripción de ejercicio o rutina.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - route: Objeto ruta, se empleará para extraer los parámetros.
 *                              - navigation: Objeto de navegación, para cambiar de pantalla.
 *    Devuelve: La vista renderizada.
 * --------------------------
 */
function PrescribeToUserScreen({ route, navigation }){
    // Extraemos los parámetros del objeto route.
    const {what, data={}, onPopTwo=() => console.log("Nada")} = route.params;

    /* --------------------------
    *    Nombre de la Función: handleSubmit
    *    Funcionamiento: Se encarga de extraer la información de los campos y enviarla al servidor.
    *    Argumentos que recibe: 
    *           - values: Objeto con los valores de los campos del formulario.
    *    Devuelve: Si no ha habido error, nada. Si ha habido un error, devuelve un mensaje de alert.
    * --------------------------
    */
    const handleSubmit = async (values) => {
        // Creamos el objeto prescripción.
        var prescription = {
            usuario_email: values.usuario_email, 
        };
        prescription[what+"_id"] = parseInt(values.id);
        prescription.especialista_email = values.especialista_email;
        prescription.Comentarios = values.Comentarios;

        // En la consulta a la API se distinguen varios casos:
        // El parámetro what distingue entre prescribir ejercicio o rutina.
        // Además, si en los datos recibidos en parámetros existen comentarios del especialista,
        // se entiende que es modificar prescripción, y no crear una nueva. Esto se hace para reutilizar código.
        const result = await (
                                what == "ejercicio" 
                                ? 
                                (
                                    "Comentarios" in data ? prescriptionsApi.updateWorkoutFromUser(prescription) : prescriptionsApi.prescribe_UW(prescription) 
                                ):( 
                                    "Comentarios" in data ? prescriptionsApi.updateRoutineFromUser(prescription) : prescriptionsApi.prescribe_UR(prescription) 
                                )
                            );

        if(!result.ok)
            return Alert.alert("Error","Ha habido un error al subir la prescripción. Por favor compruebe que los datos son correctos.");
        Alert.alert("Éxito","Prescripción implementada con éxito");
        // Ejecutamos el callback antes de volver a una vista anterior.
        onPopTwo();
        "Comentarios" in data ? navigation.pop(2) : navigation.goBack();
    };

    return (
        <Screen style={styles.container}>
            <ScrollView>
                <Form
                    initialValues={{
                        usuario_email: data.usuario_email ? data.usuario_email : "",
                        id: data[what+"_id"] ? data[what+"_id"].toString() : "",
                        especialista_email: data.especialista_email,
                        Comentarios: data.Comentarios ? data.Comentarios : "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <FormField 
                        name="usuario_email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Correo Electronico"
                        keyboardType="email-address"
                        editable={ data.usuario_email ? false : true }
                        title="Usuario:"
                    />
                    <FormField 
                        name="id"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder={"Identificador de "+what}
                        keyboardType="numeric"
                        editable={ data[what+"_id"] ? false : true }
                        title={what == "ejercicio" ? "Ejercicio (ID):" : "Rutina (ID):"}
                    />
                    <FormField 
                        name="especialista_email"
                        editable={false}
                        title="Especialista:"
                    />
                    <FormField 
                        name="Comentarios"
                        autoCorrect={true}
                        autoCapitalize="none"
                        placeholder="Comentarios del Especialista (OPCIONAL)"
                        multiline
                        title="Comentarios:"
                    />
                    <SubmitButton title={"Prescribir "+what} color={"secondary"}/>
                </Form>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    }
})

export default PrescribeToUserScreen;
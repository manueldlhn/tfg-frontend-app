/* ---------------------------
 *    Nombre del fichero: AssociateScreen.js
 *    Descripción: Este fichero contiene la vista de "Asociar ejercicio a rutina".        
 *    Contenido:
 *          - AssociateScreen: Función que renderiza la vista de "Asociar ejercicio a rutina" y su
 *                             comportamiento ante ciertos eventos.        
 * ---------------------------  
 */

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
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
    EJERCICIO_ej_id: Yup.number().required().positive().integer().label("EJERCICIO¨_ej_id"),
    RUTINA_rut_id: Yup.number().required().positive().integer().label("RUTINA_rut_id"),
    USUARIOS_Email: Yup.string().required().max(45).email().label("USUARIOS_Email"),
    Comentarios: Yup.string().required().max(100).label("Comentarios"),
});


/* --------------------------
 *    Nombre de la Función: AssociateScreen
 *    Funcionamiento: Define la vista y el comportamiento del formulario
 *                    de asociación de ejercicio a rutina.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - route: Objeto ruta, se empleará para extraer los parámetros.
 *                              - navigation: Objeto de navegación, para cambiar de pantalla.
 *    Devuelve: La vista renderizada.
 * --------------------------
 */
function AssociateScreen({ route, navigation }) {
    // Extraemos los parámetros de route.
    const {email, item={}, onPopTwo = () => 0} = route.params;

    /* --------------------------
    *    Nombre de la Función: handleSubmit
    *    Funcionamiento: Se encarga de extraer la información de los campos y enviarla al servidor.
    *    Argumentos que recibe: 
    *           - values: Objeto con los valores de los campos del formulario.
    *    Devuelve: Si no ha habido error, nada. Si ha habido un error, devuelve un mensaje de alert.
    * --------------------------
    */
    const handleSubmit = async (values) => {
        // Creamos el objeto con los valores del formulario, dando el formato adecuado.
        var association = { USUARIOS_Email : values.USUARIOS_Email };
        association.EJERCICIO_ej_id = parseInt(values.EJERCICIO_ej_id);
        association.RUTINA_rut_id = parseInt(values.RUTINA_rut_id);
        association.Comentarios = values.Comentarios;

        // Cargamos los datos en el servidor por medio de la API.
        // Si en el parámetro item recibido existía el elemento Comentarios, es una modificación. Si no existía, es crear un nuevo. 
        const result = await( (item.Comentarios !== undefined) ? prescriptionsApi.updateWorkoutFromRoutine(association) :  prescriptionsApi.prescribe_WR(association));

        if(!result.ok)
            return alert("Ha habido un error al realizar la asociación. Por favor compruebe los datos que ha proporcionado");
        alert("Asociación exitosa");
        
        // La función onPopTwo define qué deberá hacerse antes de volver atrás en la pila de navegación.
        onPopTwo();
        if("Comentarios" in item){
            
            navigation.pop(2);
        } else {
            navigation.goBack();
        }
    };

    return (
        <Screen style={styles.container}>
            <ScrollView>
                <Form 
                    initialValues={{
                        EJERCICIO_ej_id: item.EJERCICIO_ej_id ? item.EJERCICIO_ej_id.toString() : "",
                        RUTINA_rut_id: item.RUTINA_rut_id ? item.RUTINA_rut_id.toString() :"",
                        USUARIOS_Email: email,
                        Comentarios: item.Comentarios !== undefined ? item.Comentarios : "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <FormField 
                        name="EJERCICIO_ej_id"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder={"Identificador de ejercicio"}
                        keyboardType="numeric"
                        editable = { item.EJERCICIO_ej_id !== undefined ? false : true }
                        title = "Ejercicio (ID):"
                    />
                    <FormField 
                        name="RUTINA_rut_id"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder={"Identificador de rutina"}
                        keyboardType="numeric"
                        editable = { item.RUTINA_rut_id !== undefined ? false : true }
                        title="Rutina (ID):"
                    />
                    <FormField 
                        name="USUARIOS_Email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Correo Electronico"
                        keyboardType="email-address"
                        editable={ false }
                        title="Especialista:"
                    />
                    <FormField 
                        name="Comentarios"
                        autoCorrect={true}
                        autoCapitalize="none"
                        placeholder="Comentarios del Especialista"
                        multiline
                        title="Comentarios:"
                    />

                    <SubmitButton title={item.Comentarios !== undefined ? "Actualizar" : "Asociar"} color={"secondary"}/>
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

export default AssociateScreen;
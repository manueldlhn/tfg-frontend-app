/* ---------------------------
 *    Nombre del fichero: CreateWorkoutScreen.js 
 *    Descripción: Este fichero contiene la vista de "Crear/Modificar Ejercicio".        
 *    Contenido: 
 *          - CreateWorkoutScreen: Función que renderiza la vista de "Crear/Modificar ejercicio" y su
 *                                 comportamiento ante ciertos eventos.     
 * ---------------------------  
 */

import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton, Checkbox } from "../components/forms";
import workoutsApi from '../api/workouts';
import routes from "../navigation/routes";


/* --------------------------
 *    Nombre: validationSchema
 *    Descripción: Este objeto impone las restricciones de los campos
 *                 del formulario para que se pueda proceder al submit.
 * -------------------------- 
 */
const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required().max(100).label("Nombre"),
    Subtitulo: Yup.string().required().max(200).label("Subtitulo"),
    Descripcion: Yup.string().required().max(1000).label("Descripcion"),
    Estado_forma: Yup.string().required().max(10).label("Estado_forma"),
    USUARIOS_Email: Yup.string().required().max(45).email().label("USUARIOS_Email")
})

/* --------------------------
 *    Nombre de la Función: CreateWorkoutScreen
 *    Funcionamiento: Define la vista y el comportamiento del formulario
 *                    de crear o modificar un ejercicio.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - route: Objeto ruta, se empleará para extraer los parámetros.
 *                              - navigation: Objeto de navegación, para cambiar de pantalla.
 *    Devuelve: La vista renderizada.
 * --------------------------
 */
function CreateWorkoutScreen({ route, navigation }) {
    // Extraemos los parámetros de route
    params = route.params;


    /* --------------------------
    *    Nombre de la Función: handleSubmit
    *    Funcionamiento: Se encarga de extraer la información de los campos y enviarla al servidor.
    *    Argumentos que recibe: 
    *           - workout: Objeto con los valores de los campos del formulario.
    *    Devuelve: Si no ha habido error, nada. Si ha habido un error, devuelve un mensaje de alert.
    * --------------------------
    */
    const handleSubmit = async (workout) => {
        // Si existe ej_id en los parámetros de route, se sobrescribe el valor del formulario
        if("ej_id" in params)
            workout.ej_id = params.ej_id;

        // Cargamos los datos en el servidor por medio de la API. OJO
        const result = await("ej_id" in workout ? workoutsApi.updateWorkout(workout) : workoutsApi.createWorkout(workout));
        
        if(!result.ok)
            return alert(result.data.message);
        alert("Ejercicio almacenado con éxito");
        navigation.reset({
            index: 0,
            routes: [{ name: routes.LISTING_WORKOUTS }]
        });
    };

    return (
        <Screen style={styles.container} >
            <ScrollView>
                <Form
                    initialValues={{ 
                        Nombre: params.Nombre ? params.Nombre : "", 
                        Subtitulo: params.Subtitulo ,
                        Descripcion: params.Descripcion ? params.Descripcion : "", 
                        Estado_forma: params.Estado_forma ? params.Estado_forma : "",
                        USUARIOS_Email: params.USUARIOS_Email,
                        Ubicacion: params.Ubicacion ? true : false,
                        Podometro: params.Podometro ? true : false,
                        Video: params.Video ? params.Video : "",
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
                        name="Subtitulo"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Subtítulo"
                        editable={false}
                    />
                    <FormField 
                        name="Descripcion"
                        autoCapitalize="none"
                        placeholder="Descripción"
                        multiline={true}
                        numberOfLines={4}
                    />
                    <FormField 
                        name="Estado_forma"
                        autoCapitalize="none"
                        placeholder="Estado de Forma"
                    />
                    <FormField 
                        name="USUARIOS_Email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Correo Electrónico"
                        keyboardType="email-address"
                        editable={false}
                    />
                    <Checkbox 
                        title="Ubicación"
                        name="Ubicacion"
                    />
                    <Checkbox 
                        title="Podómetro"
                        name="Podometro"
                    />
                    <FormField
                        name="Video"
                        autoCorrect={false}
                        autoCapitalize={false}
                        placeholder="Link del Video"
                    />

                    <SubmitButton title="Crear Ejercicio" color={"secondary"} />
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

export default CreateWorkoutScreen;
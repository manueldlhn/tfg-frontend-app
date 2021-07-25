import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton, Checkbox } from "../components/forms";
import workoutsApi from '../api/workouts';
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required().max(100).label("Nombre"),
    Subtitulo: Yup.string().required().max(200).label("Subtitulo"),
    Descripcion: Yup.string().required().max(1000).label("Descripcion"),
    Estado_forma: Yup.string().required().max(10).label("Estado_forma"),
    RUTINA_USUARIOS_Email: Yup.string().required().max(45).email().label("RUTINA_USUARIOS_Email")
})


function CreateWorkoutScreen({ route, navigation }) {
    params = route.params;

    const handleSubmit = async (workout) => {

        if("ej_id" in params)
            workout.ej_id = params.ej_id;

        
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
                        RUTINA_USUARIOS_Email: params.RUTINA_USUARIOS_Email,
                        Ubicacion: params.Ubicacion ? true : false,
                        Podometro: params.Podometro ? true : false,
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
                        name="RUTINA_USUARIOS_Email"
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
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton, Checkbox } from "../components/forms";
import routinesApi from '../api/routines';
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required().max(100).label("Nombre"),
    Descripcion: Yup.string().required().max(1000).label("Descripcion"),
    Info_Rutina: Yup.string().required().max(500).label("Info_Rutina"),
    USUARIOS_Email: Yup.string().required().max(45).email().label("USUARIOS_Email")
});




function CreateRoutineScreen({ route, navigation }) {
    params = route.params;

    const handleSubmit = async (routine) => {
        
        if( "rut_id" in params)
            routine.rut_id = params.rut_id;

        const result = await ("rut_id" in routine ?  routinesApi.updateRoutine(routine) : routinesApi.createRoutine(routine));
        
        if(!result.ok)
            return alert(result.data.message);
        alert("Rutina almacenada con éxito");
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
                        Pub_priv: params.Pub_priv ? true : false, 
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
                    <Checkbox 
                        title="Pública"
                        name="Pub_priv"
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
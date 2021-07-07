import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import * as Yup from "yup";

import Screen from '../components/Screen';
import { Form, FormField, SubmitButton } from '../components/forms';
import prescriptionsApi from '../api/prescriptions';
import routes from '../navigation/routes';


const validationSchema = Yup.object().shape({
    usuario_email: Yup.string().required().max(45).email().label("usuario_email"),
    id: Yup.number().required().positive().integer().label("id"),
    Comentarios: Yup.string().required().max(100).label("Comentarios"),
});


function PrescribeToUserScreen({ route, navigation }){
    const {what, data={}, onPopTwo=() => console.log("Nada")} = route.params;
    
    const handleSubmit = async (values) => {
        var prescription = {
            usuario_email: values.usuario_email, 
        };
        prescription[what+"_id"] = parseInt(values.id);
        prescription.Comentarios = values.Comentarios;

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
            return alert("Ha habido un error al subir la prescripción. Por favor compruebe que los datos son correctos.");
        alert("Prescripción implementada con éxito");
        
        if("Comentarios" in data){
            onPopTwo();
            navigation.pop(2)
        } else {
            navigation.goBack();
        }
    };

    return (
        <Screen style={styles.container}>
            <ScrollView>
                <Form
                    initialValues={{
                        usuario_email: data.usuario_email ? data.usuario_email : "",
                        id: data[what+"_id"] ? data[what+"_id"].toString() : "",
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
                    />
                    <FormField 
                        name="id"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder={"Identificador de "+what}
                        keyboardType="numeric"
                        editable={ data[what+"_id"] ? false : true }
                    />
                    <FormField 
                        name="Comentarios"
                        autoCorrect={true}
                        autoCapitalize="none"
                        placeholder="Comentarios del Especialista (OPCIONAL)"
                        multiline
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
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
    const what = route.params;
    
    const handleSubmit = async (values) => {
        var prescription = {
            usuario_email: values.usuario_email, 
        };
        prescription[what+"_id"] = parseInt(values.id);

        const result = await (what == "ejercicio" ? prescriptionsApi.prescribe_UW(prescription) : prescriptionsApi.prescribe_UR(prescription) );

        if(!result.ok)
            return alert("Ha habido un error al realizar la prescripción. Por favor compruebe que los datos son correctos.");
        alert("Prescripción realizada con éxito");
        navigation.reset({
            index: 0,
            routes: [{name: routes.PRESCRIPTION_TYPES}]
        });
    };

    return (
        <Screen style={styles.container}>
            <ScrollView>
                <Form
                    initialValues={{
                        usuario_email: "",
                        id: "",
                        Comentarios: "",
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
                    />
                    <FormField 
                        name="id"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder={"Identificador de "+what}
                        keyboardType="numeric"
                    />
                    <FormField 
                        name="Comentarios"
                        autoCorrect={true}
                        autoCapitalize="none"
                        placeholder="Comentarios del Especialista"
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
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import * as Yup from "yup";

import Screen from '../components/Screen';
import { Form, FormField, SubmitButton } from '../components/forms';
import prescriptionsApi from '../api/prescriptions';
import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
    EJERCICIO_ej_id: Yup.number().required().positive().integer().label("EJERCICIO¨_ej_id"),
    RUTINA_rut_id: Yup.number().required().positive().integer().label("RUTINA_rut_id"),
    USUARIOS_Email: Yup.string().required().max(45).email().label("USUARIOS_Email"),
    Comentarios: Yup.string().required().max(100).label("Comentarios"),
});

function AssociateScreen({ route, navigation }) {
    const email = route.params;

    const handleSubmit = async (association) => {
        association.EJERCICIO_ej_id = parseInt(association.EJERCICIO_ej_id);
        association.RUTINA_rut_id = parseInt(association.RUTINA_rut_id);

        const result = await(prescriptionsApi.prescribe_WR(association));

        if(!result.ok)
            return alert("Ha habido un error al realizar la asociación. Por favor compruebe los datos que ha proporcionado");
        alert("Asociación exitosa");
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
                        EJERCICIO_ej_id: "",
                        RUTINA_rut_id: "",
                        USUARIOS_Email: email,
                        Comentarios: "",
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
                    />
                    <FormField 
                        name="RUTINA_rut_id"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder={"Identificador de rutina"}
                        keyboardType="numeric"
                    />
                    <FormField 
                        name="USUARIOS_Email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Correo Electronico"
                        keyboardType="email-address"
                        editable={false}
                    />
                    <FormField 
                        name="Comentarios"
                        autoCorrect={true}
                        autoCapitalize="none"
                        placeholder="Comentarios del Especialista"
                        multiline
                    />

                    <SubmitButton title={"Asociar"} color={"secondary"}/>
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
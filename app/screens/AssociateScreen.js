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
    const {email, item={}, onPopTwo = () => 0} = route.params;

    const handleSubmit = async (values) => {

        var association = { USUARIOS_Email : values.USUARIOS_Email };

        association.EJERCICIO_ej_id = parseInt(values.EJERCICIO_ej_id);
        association.RUTINA_rut_id = parseInt(values.RUTINA_rut_id);
        association.Comentarios = values.Comentarios;

        const result = await( item.Comentarios !== undefined ? prescriptionsApi.updateWorkoutFromRoutine(association) :  prescriptionsApi.prescribe_WR(association));

        if(!result.ok)
            return alert("Ha habido un error al realizar la asociación. Por favor compruebe los datos que ha proporcionado");
        alert("Asociación exitosa");

        if("Comentarios" in item){
            onPopTwo();
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
                        editable = { item.Comentarios !== undefined ? false : true }
                    />
                    <FormField 
                        name="RUTINA_rut_id"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder={"Identificador de rutina"}
                        keyboardType="numeric"
                        editable = { item.Comentarios !== undefined ? false : true }
                    />
                    <FormField 
                        name="USUARIOS_Email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Correo Electronico"
                        keyboardType="email-address"
                        editable={ false }
                    />
                    <FormField 
                        name="Comentarios"
                        autoCorrect={true}
                        autoCapitalize="none"
                        placeholder="Comentarios del Especialista"
                        multiline
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
import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import authApi from "../api/auth";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required().label("Nombre"),
    Fecha_Nacimiento: Yup.date().required().label("Fecha_Nacimiento"),
    Telefono: Yup.string().required().min(9).max(9).label("Telefono"),
    Email: Yup.string().required().email().label("Email"),
    Password: Yup.string().required().min(4).label("Password"),
  });



function RegisterScreen({navigation}) {
    const handleSubmit = async ( user ) => {
        const result = await authApi.register(user);
        const info = result.ok ? result.data.message : "Ha habido un error al realizar el registro";
        alert(info);

        result.data.ok && navigation.reset({
            index: 0,
            routes: [{ name: routes.WELCOME }]
        });
    }

    return (
        <Screen style={styles.container} >
            <Form
                initialValues={{ Nombre:"", Fecha_Nacimiento:"", Telefono:"", Email:"", Password:"" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormField 
                    autoCorrect={false}
                    icon="account"
                    name="Nombre"
                    placeholder="Nombre y Apellidos"
                />
                <FormField 
                    autoCapitalize="none"
                    icon="calendar"
                    name="Fecha_Nacimiento"
                    placeholder="Fecha de nacimiento (AAAA-MM-DD)"
                    keyboardType="number-pad"
                />    
                <FormField 
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="phone"
                    keyboardType="phone-pad"
                    name="Telefono"
                    placeholder="Número de teléfono"
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="Email"
                    placeholder="Correo Electrónico"
                    textContentType="emailAddress"
                />
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="Password"
                    placeholder="Contraseña"
                    secureTextEntry
                    textContentType="password"
                />
                <SubmitButton title="Registrarse" color={"secondary"} />
            </Form>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
});

export default RegisterScreen;
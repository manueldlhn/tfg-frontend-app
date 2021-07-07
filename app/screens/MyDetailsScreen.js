import React, { useContext } from 'react';
import { StyleSheet, Alert } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import colors from '../config/colors';
import { Form, FormField, SubmitButton } from '../components/forms';
import usersApi from '../api/users';
import routes from '../navigation/routes';
import AuthContext from '../auth/context';

const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required().label("Nombre"),
    Fecha_Nacimiento: Yup.date().required().label("Fecha_Nacimiento"),
    Telefono: Yup.string().required().min(9).max(9).label("Telefono"),
    Email: Yup.string().required().email().label("Email"),
    Password: Yup.string().required().min(4).label("Password")
});

function MyDetailsScreen({navigation}) {
    const {user, setUser } = useContext(AuthContext);

    const proceedUpdate = async (values) => {
        Object.keys(user).forEach(key => {
            if(values[key]) user[key] = values[key];
        });

        const result = await usersApi.updateUser(user);
        
        if(!result.ok || !result.data.ok) return alert(result.data.message);
       
        setUser(user);
        alert(result.data.message);
        navigation.reset({
            index: 0,
            routes: [{ name: routes.MY_ACCOUNT }]
        });
    };

    const handleSubmit = async(values) => {
        Alert.alert(
            "Confirmación",
            "¿Son correctos los valores que ha proporcionado?\n"+JSON.stringify(values),
            [
                {
                    text: "No",
                },
                {
                    text: "Sí",
                    onPress: () => {proceedUpdate(values)},
                }
            ]
        ); 
        
    };

    return (
        <Screen style={styles.container} >
            <Form 
                initialValues={{
                    Nombre: user.Nombre,
                    Fecha_Nacimiento: user.Fecha_Nacimiento,
                    Telefono: user.Telefono,
                    Email: user.Email,
                    Password: user.Password
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="Email"
                    placeholder="Correo Electrónico"
                    textContentType="emailAddress"
                    editable={false}
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
                <FormField
                    autoCorrect={false}
                    icon="account"
                    name="Nombre"
                    placeholder="Nombre y Apellidos"
                />
                <FormField
                    autoCapitalize = "none"
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
                    placeholder="Número de Teléfono"
                />
                
                <SubmitButton title="Modificar Datos" color={"secondary"} />

            </Form>

        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    }
})

export default MyDetailsScreen;
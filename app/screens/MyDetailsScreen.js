/* ---------------------------
 *    Nombre del fichero: MyDetailsScreen.js
 *    Descripción: Este fichero contiene la vista de "Modificar datos personales".        
 *    Contenido: 
 *          - MyDetailsScreen: Función que renderiza la pantalla y regula el comportamiento
 *                             del formulario.        
 * ---------------------------  
 */

import React, { useContext } from 'react';
import { StyleSheet, Alert } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { Form, FormField, SubmitButton } from '../components/forms';
import usersApi from '../api/users';
import routes from '../navigation/routes';
import AuthContext from '../auth/context';


/* --------------------------
 *    Nombre: validationSchema
 *    Descripción: Este objeto impone las restricciones de los campos
 *                 del formulario para que se pueda proceder al submit.
 * -------------------------- 
 */
const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required().label("Nombre"),
    Fecha_Nacimiento: Yup.date().required().label("Fecha_Nacimiento"),
    Telefono: Yup.string().required().min(9).max(9).label("Telefono"),
    Email: Yup.string().required().email().label("Email"),
    Password: Yup.string().required().min(4).label("Password")
});


/* --------------------------
 *    Nombre de la Función: MyDetailsScreen
 *    Funcionamiento: Define la vista y el comportamiento del formulario
 *                    de modificar datos personales.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - navigation: Objeto de navegación, para cambiar de pantalla.
 *    Devuelve: La vista renderizada.
 * --------------------------
 */
function MyDetailsScreen({navigation}) {
    // Hook para poder modificar el usuario tras enviar los datos.
    const {user, setUser } = useContext(AuthContext);

    /* --------------------------
    *    Nombre de la Función: proceedUpdate
    *    Funcionamiento: Se modifican en user aquellos datos que haya cambiado el usuario en el formulario.
    *                    Se envía la información a la API y se gestiona la respuesta.
    *    Argumentos que recibe: 
    *               - values: Objeto con los valores de los campos del formulario.
    *    Devuelve: Si ha habido error, mensaje de alert. Si no, nada.
    * --------------------------
    */
    const proceedUpdate = async (values) => {
        // Para cada elemento de user, se modifica con los datos del formulario.
        Object.keys(user).forEach(key => {
            if(values[key]) user[key] = values[key];
        });
        // Se envía la información a la API
        const result = await usersApi.updateUser(user);
        
        // En caso de error, se informa y se sale.
        if(!result.ok || !result.data.ok) return alert(result.data.message);
        // Actualizamos usuario en local.
        setUser(user);
        alert(result.data.message);
        // Volvemos a "Mi cuenta".
        navigation.reset({
            index: 0,
            routes: [{ name: routes.MY_ACCOUNT }]
        });
    };


    /* --------------------------
    *    Nombre de la Función: handleSubmit
    *    Funcionamiento: Se encarga de Solicitar confirmación y llamar a la función proceedUpdate.
    *    Argumentos que recibe: 
    *           - values: Objeto con los valores de los campos del formulario.
    *    Devuelve: Nada (void).
    * --------------------------
    */
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
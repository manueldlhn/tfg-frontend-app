/* ---------------------------
 *    Nombre del fichero: RoutineDetailsScreen.js
 *    Descripción: Este fichero contiene la vista de detalles de rutina.        
 *    Contenido:
 *          - RoutineDetailsScreen: Función que define el aspecto y comportamiento de la pantalla.        
 * ---------------------------  
 */

import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';


import colors from '../config/colors';
import Text from '../components/Text';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import routinesApi from '../api/routines';
import routes from '../navigation/routes';
import useAuth from '../auth/useAuth';
import Button from '../components/Button';
import { ListItemSeparator } from '../components/lists';


/* --------------------------
 *    Nombre de la Función: RoutineDetailsScreen
 *    Funcionamiento: Renderiza la pantalla de detalles de rutina y regula el comportamiento
 *                    de los botones.
 *    Argumentos que recibe: Objeto que contiene:
 *                                  - route: Objeto ruta. Contiene los parámetros recibidos de la vista anterior.
 *                                  - navigation: Objeto navegación. Servirá para cambiar de vista.
 *    Devuelve: La pantalla renderizada.
 * --------------------------
 */
function RoutineDetailsScreen({ route, navigation }) {
    // Extraemos los parámetros de route
    const routine = route.params;
    // Obtenemos el usuario de useAuth
    const { user } = useAuth();

    /* --------------------------
    *    Nombre de la Función: handleDelete
    *    Funcionamiento: Solicita confirmación ante de eliminar la rutina
    *    Argumentos que recibe: 
    *                   - rut_id: Identificador de rutina.
    *    Devuelve: Nada (void).
    * --------------------------
    */
    const handleDelete = (rut_id) => {

        /* --------------------------
        *    Nombre de la Función: proceedDeletion
        *    Funcionamiento: Una vez confirmado por el especialista, se envía la solicitud a la API.
        *    Argumentos que recibe: 
        *                   - rut_id: identificador de rutina.
        *    Devuelve: Mensaje de alert si ha habido error, nada en caso contrario.
        * --------------------------
        */
        const proceedDeletion = async (rut_id) => {
            const result = await routinesApi.deleteRoutine(rut_id);

            if(!result.ok)
                return alert(result.data.message);
            alert(result.data.message);
            navigation.reset({
                index: 0,
                routes: [{ name: routes.LISTING_ROUTINES }]
            });
        }
        // Confirmación de borrado.
        Alert.alert(
            "Confirmación",
            "Está a punto de eliminar una rutina. "+
            "Si esta rutina está prescrita a algún usuario, desaparecerá la prescripción asociada.\n\n"+
            "¿Seguro que desea borrar esta rutina?",
            [
                {
                    text:"No",
                },
                {
                    text:"Sí",
                    onPress: () => {proceedDeletion(rut_id)},
                }
            ]
        );
    };

    return (
        <Screen style={styles.container}>

            <Text style={styles.name}>{routine.Nombre}</Text>
            <ListItemSeparator />
            <View style={styles.miscellaneous}>
                <Text style={styles.miscText}>{"Creado por: "+routine.Info_Rutina+" - "+routine.USUARIOS_Email}</Text>
            </View>
            
            {user.Rol == "Especialista" && <Text style={styles.id}>{"ID:"+routine.rut_id}</Text>}
            <Text style={styles.description}>{routine.Descripcion}</Text>
            {routine.Comentarios !== undefined && <Text style={styles.description}>{"Comentarios del especialista "+(routine.especialista_email ? routine.especialista_email: "")+": "+routine.Comentarios}</Text>}

            <View style={styles.showWorkoutsButton}>
                <Button
                    title="Ver Ejercicios"
                    onPress={() => navigation.navigate(routes.LISTING_WORKOUTS, { rut_id: routine.rut_id, especialista_email: routine.especialista_email ? routine.especialista_email : null})}
                    color="secondary"
                    fontColor="white"
                    borderWidth={3}
                    borderColor="lightgreen"
                />
            </View>
                
                

            {   
                user.Rol == "Especialista" &&
                <View style={styles.buttons}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.CREATE_ROUTINE, routine)}>
                        <View style={styles.button}>
                            <Icon 
                                name="pencil"
                                size={60}
                                backgroundColor={colors.gold}
                                iconColor={colors.white}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleDelete(routine.rut_id)}>
                        <View style={styles.button}>
                            <Icon 
                                name="delete"
                                size={60}
                                backgroundColor={colors.darkred}
                                iconColor={colors.white}
                            />
                        </View>
                    </TouchableWithoutFeedback>               
                    

                </View>
            }
        </Screen>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop:10,
        backgroundColor: colors.white,
    },
    name: {
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 30,
        width: "70%",
    },
    id: {
        position: "absolute",
        right: 10,
        top: 10,
        fontSize: 25,
        fontWeight: "bold",
        color: colors.secondary,
    },
    miscellaneous: {
        position: "relative",
        top: 15,
        marginBottom: 20,
    },
    miscText: {
        fontWeight: 'bold',
        fontStyle:"italic",
        fontSize: 15,
    },
    description: {
        marginTop: 15,
        marginBottom: 30
    },
    buttons: {
        position: "absolute",
        right: "5%",
        bottom: 30,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    button: {
        padding: 10,
    },
    showWorkoutsButton: {
        bottom: 0,
        width: 180,
        height: 25,
        left: 15
    }
})

export default RoutineDetailsScreen;
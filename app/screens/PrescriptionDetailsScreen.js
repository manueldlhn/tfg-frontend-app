/* ---------------------------
 *    Nombre del fichero: PrescriptionDetailsScreen.js
 *    Descripción: Este fichero contiene la vista de detalles de prescripción.        
 *    Contenido:
 *          - PrescriptionDetailsScreen: Función que define el aspecto y comportamiento de la pantalla.        
 * ---------------------------  
 */

import React from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native';

import colors from '../config/colors';
import Text from '../components/Text';
import Icon from '../components/Icon';
import routes from '../navigation/routes';
import prescriptionsApi from '../api/prescriptions';
import Screen from '../components/Screen';


/* --------------------------
 *    Nombre de la Función: PrescriptionDetailsScreen
 *    Funcionamiento: Renderiza la pantalla de detalles de prescripción y regula el comportamiento
 *                    de los botones.
 *    Argumentos que recibe: Objeto que contiene:
 *                                  - route: Objeto ruta. Contiene los parámetros recibidos de la vista anterior.
 *                                  - navigation: Objeto navegación. Servirá para cambiar de vista.
 *    Devuelve: La pantalla renderizada.
 * --------------------------
 */
function PrescriptionDetailsScreen({route, navigation}) {
    // Extraemos los parámetros de route
    const { type, item, usuario_email, onGoBack } = route.params;

    item.usuario_email = usuario_email;


    /* --------------------------
    *    Nombre de la Función: handleDelete
    *    Funcionamiento: Solicita confirmación ante de eliminar la prescripción
    *    Argumentos que recibe: 
    *                   - id: Identificador de ejercicio o rutina, según corresponda.
    *                   - email: email del usuario al que se ha prescrito.
    *    Devuelve: Nada (void).
    * --------------------------
    */
    const handleDelete = (id, email) => {
        
        /* --------------------------
        *    Nombre de la Función: proceedDeletion
        *    Funcionamiento: Una vez confirmado por el especialista, se envía la solicitud a la API.
        *    Argumentos que recibe: 
        *                   - id: identificador de ejercicio o rutina, según corresponda.
        *                   - email: email del usuario al que se ha prescrito.
        *    Devuelve: Mensaje de alert si ha habido error, nada en caso contrario.
        * --------------------------
        */
        const proceedDeletion = async (id, email) => {
            // Si el tipo (de prescripción) es rutina, la petición se hace por rutina. Si no, es por ejercicio.
            const result = type=="Rutina" ? await prescriptionsApi.deleteRoutineFromUser(id,email) : await prescriptionsApi.deleteWorkoutFromUser(id, email);
            if(!result.ok)
                return Alert.alert("Error","Ha habido un error en el proceso.");
            Alert.alert("Información",result.data.message);
            onGoBack();
            navigation.goBack();        
        };
        // Confirmación de borrado.
        Alert.alert(
            "Confirmación",
            "¿Seguro que desea borrar este registro?",
            [
                {
                    text:"No",
                },
                {
                    text:"Sí",
                    onPress: () => {proceedDeletion(id,email)},
                }
            ]
        );
    };
    
    return (
        <Screen style={{backgroundColor: colors.lightprimary, flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.id}>{type=="Rutina" ? "Rutina: "+item.Nombre+" (ID: "+item.rutina_id+")" : "Ejercicio: "+item.Nombre+" (ID: "+item.ejercicio_id+")" }</Text>
                <Text style={styles.email}>{"Usuario: "+usuario_email}</Text>
                <Text style={styles.comments}>{"Comentarios del Especialista ("+item.especialista_email+"):\n\n"+ (item.Comentarios == null ? "Ninguno" : item.Comentarios) }</Text>
            </View>
            <View style={styles.buttons}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.PRESCRIBE_TO_USER, {what: type.toLowerCase(), data: item, onPopTwo: () => onGoBack()})}>
                    <View style={styles.button}>
                        <Icon 
                            name="pencil"
                            size={60}
                            backgroundColor={colors.gold}
                            iconColor={colors.white}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => handleDelete( (type=="Rutina"? item.rutina_id : item.ejercicio_id), item.usuario_email )}>
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
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 10,
        backgroundColor: colors.white,
        height: "90%",
        borderBottomEndRadius: 1000,
    },
    id: {
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 30,
    },
    email: {
        color: colors.grey,
    },
    comments: {
        paddingTop: 30,
    },
    buttons: {
        position: "absolute",
        right:"5%",
        bottom: 30,
        flexDirection: "column",
        justifyContent:"space-between",
    },
    button: {
        padding: 10,
    }
})

export default PrescriptionDetailsScreen;
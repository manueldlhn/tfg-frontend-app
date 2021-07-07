import React from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native';

import colors from '../config/colors';
import Text from '../components/Text';
import Icon from '../components/Icon';
import routes from '../navigation/routes';
import prescriptionsApi from '../api/prescriptions';
import Screen from '../components/Screen';

function PrescriptionDetailsScreen({route, navigation}) {
    const { type, item, onGoBack } = route.params;

    const handleDelete = (id, email) => {
        
        const proceedDeletion = async (id, email) => {
            const result = type=="Rutina" ? await prescriptionsApi.deleteRoutineFromUser(id,email) : await prescriptionsApi.deleteWorkoutFromUser(id, email);
            if(!result.ok)
                return alert(result.data.message);
            alert(result.data.message);
            onGoBack();
            navigation.goBack();        
        }

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
                <Text style={styles.id}>{"ID de "+type+": "+ (type=="Rutina" ? item.rutina_id : item.ejercicio_id) }</Text>
                <Text style={styles.email}>{"Usuario: "+item.usuario_email}</Text>
                <Text style={styles.comments}>{"Comentarios del Especialista:\n\n"+ (item.Comentarios == null ? "Ninguno" : item.Comentarios) }</Text>
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
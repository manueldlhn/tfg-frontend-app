import React from 'react';
import { View, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native';

import colors from '../config/colors';
import Text from '../components/Text';
import Icon from '../components/Icon';
import routes from '../navigation/routes';
import prescriptionsApi from '../api/prescriptions';
import Screen from '../components/Screen';

function AssociationDetailsScreen({route, navigation}) {
    const { association, email, onGoBack } = route.params;
    console.log(association);
    const handleDelete = (EJERCICIO_ej_id, RUTINA_rut_id ) => {
        
        const proceedDeletion = async (EJERCICIO_ej_id, RUTINA_rut_id) => {
            const result = await prescriptionsApi.deleteWorkoutFromRoutine(EJERCICIO_ej_id, RUTINA_rut_id);
            if(!result.ok)
                return alert(result.data.message);
            alert(result.data.message);
            onGoBack();
            navigation.goBack();
        };

        Alert.alert(
            "Confirmación",
            "¿Seguro que desea borrar esta asociación?",
            [
                {
                    text: "No",
                },
                {
                    text: "Sí",
                    onPress: () => { proceedDeletion(EJERCICIO_ej_id, RUTINA_rut_id) },
                }
            ]
        );
    };
    
    
    
    return (
        <Screen style={{backgroundColor: colors.lightprimary, flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.id}>{"Asociación Ej."+association.EJERCICIO_ej_id+" - Rut."+association.RUTINA_rut_id}</Text>
                <Text style={styles.email}>{"Especialista: "+association.USUARIOS_Email}</Text>
                <Text style={styles.comments}>{"Comentarios del Especialista:\n\n"+association.Comentarios}</Text>
            </View>
            <View style={styles.buttons}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.ASSOCIATE, {email: email, item: association, onPopTwo: () => onGoBack() })}>
                    <View style={styles.button}>
                        <Icon 
                            name="pencil"
                            size={60}
                            backgroundColor={colors.gold}
                            iconColor={colors.white}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => handleDelete( association.EJERCICIO_ej_id, association.RUTINA_rut_id )}>
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

export default AssociationDetailsScreen;
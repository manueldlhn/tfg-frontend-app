import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';


import colors from '../config/colors';
import Text from '../components/Text';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import workoutsApi from '../api/workouts';
import prescriptionsApi from '../api/prescriptions';
import routes from '../navigation/routes';
import useAuth from '../auth/useAuth';

function WorkoutDetailsScreen({ route, navigation }) {
    const { workout, rut_id, onGoBack } = route.params;
    const {user} = useAuth();
    console.log(workout);
    const handleDelete = (ej_id, rut_id) => {
        console.log(rut_id);
        const proceedDeletion = async (EJERCICIO_ej_id, RUTINA_rut_id) => {
            
            const result = RUTINA_rut_id === null 
                            ? 
                            await workoutsApi.deleteWorkout(EJERCICIO_ej_id)
                            :
                            await prescriptionsApi.deleteWorkoutFromRoutine(EJERCICIO_ej_id, RUTINA_rut_id);

            if(!result.ok)
                return alert(result.data.message);
            alert(result.data.message);
            onGoBack();
            navigation.goBack();
        };

        Alert.alert(
            "Confirmación",
            rut_id ?
                "Está a punto de eliminar la asociación de un ejercicio a una rutina. "+
                "Esta acción desligará el ejercicio de la rutina, pero el ejercicio seguirá existiendo.\n\n"+
                "¿Seguro que desea eliminar la asociación?"
                :
                "Está a punto de eliminar un ejercicio. "+
                "Es posible que se encuentre incluido en alguna rutina o prescrito a algún usuario. "+
                "Si prosigue con el borrado, quedará eliminado para las posibles rutinas o usuarios mencionados.\n\n"+
                "¿Seguro que desea eliminar el ejercicio?",
            [
                {
                    text: "No",
                },
                {
                    text: "Sí",
                    onPress: () => {proceedDeletion(ej_id, rut_id)},
                }
            ]
        );
    };


    
    return (
        <Screen style={{backgroundColor: colors.lightprimary, flex: 1}}>
            <View style={styles.container}>
                
                <Text style={styles.title}>{workout.Nombre}</Text>
                {user.Rol == "Especialista" && <Text style={styles.id}>{"ID:"+workout.ej_id}</Text>} 
                <Text style={styles.description}>{"Estado de forma: "+workout.Estado_forma}</Text>
                <Text style={styles.description}>{workout.Descripcion}</Text>
                {workout.Comentarios !== undefined && <Text style={styles.description}>{"Comentarios del especialista "+(workout.USUARIOS_Email ? workout.USUARIOS_Email:"")+": "+workout.Comentarios}</Text>}
                
                
            </View>
            {   
                user.Rol == "Usuario" ?
                (
                <View style={styles.buttons}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.DO_WORKOUT, workout)}>
                        <View style={styles.button}>
                            <Icon 
                                name="play"
                                size={60}
                                backgroundColor={colors.secondary}
                                iconColor={colors.white}
                            />
                        </View>
                    </TouchableWithoutFeedback>   
                </View>
                ) : (
                <View style={styles.buttons}>
                    <TouchableWithoutFeedback onPress={() => "Comentarios" in workout ?
                                                                navigation.navigate(routes.ASSOCIATE, {email: user.Email, item: {RUTINA_rut_id: rut_id, EJERCICIO_ej_id: workout.ej_id, Comentarios: workout.Comentarios}, onPopTwo: () => onGoBack() })
                                                                :
                                                                navigation.navigate(routes.CREATE_WORKOUT, workout)
                                                       }
                    >
                        <View style={styles.button}>
                            <Icon 
                                name="pencil"
                                size={60}
                                backgroundColor={colors.gold}
                                iconColor={colors.white}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleDelete(workout.ej_id, rut_id)}>
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
                )
            }
            <View style={styles.miscellaneous}>
                <Text style={styles.miscText}>{"Creado por: "+workout.Subtitulo+" - "+workout.RUTINA_USUARIOS_Email}</Text>
            </View>
        </Screen>
            
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop:10,
        backgroundColor: colors.white,
        height: "90%",
        borderBottomEndRadius: 1000,
    },
    title: {
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 30,
        width: "70%",
    },
    id: {
        position:"absolute",
        right: 10,
        top: 10,
        fontSize: 25,
        fontWeight:"bold",
        color: colors.secondary,
    },
    miscellaneous: {
        position: "absolute",
        left: 15,
        bottom: 25,
    },
    miscText: {
        fontWeight: "bold",
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
    }
})

export default WorkoutDetailsScreen;
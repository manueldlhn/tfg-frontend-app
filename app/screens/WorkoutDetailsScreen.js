import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';


import colors from '../config/colors';
import Text from '../components/Text';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import workoutsApi from '../api/workouts';
import routes from '../navigation/routes';
import useAuth from '../auth/useAuth';

function WorkoutDetailsScreen({ route, navigation }) {
    const workout = route.params;
    const {user} = useAuth();

    const handleDelete = (ej_id) => {

        const proceedDeletion = async (ej_id) => {
            
            const result = await workoutsApi.deleteWorkout(ej_id);

            if(!result.ok)
                return alert(result.data.message);
            alert(result.data.message);
            navigation.reset({
                index: 0,
                routes: [{ name: routes.LISTING_WORKOUTS }]
            });
        };

        Alert.alert(
            "Confirmación",
            "¿Seguro que desea borrar este ejercicio?",
            [
                {
                    text: "No",
                },
                {
                    text: "Sí",
                    onPress: () => {proceedDeletion(ej_id)},
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
                {workout.Comentarios !== undefined && <Text style={styles.description}>{"Comentarios del especialista "+(workout.especialista_email ? workout.especialista_email:"")+": "+workout.Comentarios}</Text>}
                
                
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
                workout.Comentarios === undefined &&
                <View style={styles.buttons}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.CREATE_WORKOUT, workout)}>
                        <View style={styles.button}>
                            <Icon 
                                name="pencil"
                                size={60}
                                backgroundColor={colors.gold}
                                iconColor={colors.white}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleDelete(workout.ej_id)}>
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
/* ---------------------------
 *    Nombre del fichero: ListingWorkoutsScreen.js
 *    Descripción: Este fichero contiene la pantalla de listado de ejercicios.        
 *    Contenido: 
 *          - ListingWorkoutsScreen: Función que regula el comportamiento y el aspecto de la pantalla.        
 * ---------------------------  
 */

import React, {useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';

import Screen from '../components/Screen';
import WorkoutCard from '../components/cards/WorkoutCard';
import colors from '../config/colors';
import routes from '../navigation/routes';
import workoutsApi from '../api/workouts';
import AddButton from '../components/AddButton';
import useAuth from '../auth/useAuth';
import prescriptionsApi from '../api/prescriptions';

/* --------------------------
 *    Nombre de la Función: ListingWorkoutsScreen
 *    Funcionamiento: Carga en la pantalla un listado de ejercicios.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - route: Ruta de la pantalla. Se utilizará para extraer los parámetros.
 *                              - navigation: Objeto de navegación. Se utilizará para cambiar de pantalla.
 *    Devuelve: La pantalla renderizada.
 * --------------------------
 */
function ListingWorkoutsScreen({ route, navigation }) {
    // HOOKS
    // Para el listado.
    const [workouts, setWorkouts] = useState([]); 
    // Flag de recarga de la pantalla
    const [refreshing, setRefreshing] = useState(false);
    // Offset para cargar paulatinamente los datos
    const [offset, setOffset] = useState(0);
    // Extraemos el email de usuario de los parámetros de route.
    const {user} = useAuth();

    // Flag que servirá para distinguir si los ejercicios a obtener son los que pertenecen a una rutina, o todos en general.
    const allWorkouts = (route.params == undefined || route.params.rut_id == undefined);

    // Hook useEffect lanzado al cargar la pantalla para cargar los datos en la lista.
    useEffect(() => {
        loadWorkouts();
        !allWorkouts && navigation.setOptions({ title: "Ejercicios de la Rutina "+route.params.rut_id });
    }, []);
    

    /* --------------------------
    *    Nombre de la Función: loadWorkouts
    *    Funcionamiento: Solicita a la API la información de ejercicios.
    *                    Actualiza con el resultado y actualiza el offset para futuras solicitudes.
    *    Argumentos que recibe: Nada.
    *    Devuelve: Nada (void).
    * --------------------------
    */
    const loadWorkouts = async () => {
        // Hay varios casos.
        // AllWorkouts true: se cargan todos. Aquí si el rol es especialista carga todos, si es usuario cargará únicamente los prescritos a él.
        // AllWorkouts false: se cargan aquellos ejercicios asociados a una rutina concreta.
        const response = allWorkouts ? 
                            (
                                user.Rol == "Especialista" ? await workoutsApi.getWorkouts(offset) : await prescriptionsApi.getWorkoutsFromUser(user.Email, offset)
                            ) : ( 
                                await prescriptionsApi.getWorkoutsFromRoutine(route.params.rut_id, offset)
                            );
        // Datos actualizados con los nuevos registros.
        allWorkouts ? setWorkouts(workouts => workouts.concat(response.data)) : checkWorkouts(workouts, response.data);
        // Nuevo Offset
        setOffset(offset => offset + response.data.length);
    };


    /* --------------------------
    *    Nombre de la Función: checkWorkouts
    *    Funcionamiento: Comprueba que la rutina tenga ejercicios asociados. Si no,
    *                    lanza un mensaje de alert.
    *    Argumentos que recibe:
    *               - workouts: Array de objetos "workout" almacenados en la app.
    *               - data: Nuevos datos de ejercicios recibidos de la API.
    *    Devuelve: Nada (void).
    * --------------------------
    */
    const checkWorkouts = (workouts, data) => {
        if(workouts.length+data.length == 0){
            Alert.alert("No hay datos","Esta rutina no tiene ejercicios asociados. Para añadir uno, por favor utilice el botón (+) de abajo.");
        } else {
            if(route.params.especialista_email != null) {
                data.forEach(workout => {
                    workout.RUTINA_rut_id = route.params.rut_id;
                });
            }
            setWorkouts(workouts => workouts.concat(data));
        }
    };

    /* --------------------------
    *    Nombre de la Función: onRefresh
    *    Funcionamiento: Al deslizar hacia abajo para recargar, se resetean todos los datos
    *                    almacenados de ejercicios y offset, y se vuelve a solicitar información
    *                    a la API. Se regula por medio del hook refreshing.
    *    Argumentos que recibe: Ninguno.
    *    Devuelve: Nada (Void).
    * --------------------------
    */
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setWorkouts(() => []);
        setOffset(() => 0);
        loadWorkouts()
        .then(()=> setRefreshing(false));
    }, []); 


    /* --------------------------
    *    Nombre de la Función: handleLoadMore
    *    Funcionamiento: Como los datos de ejercicios se obtienen de 10 en 10, al alcanzar el final,
    *                    se lanza una nueva petición a la API para solicitar los 10 siguientes, salvo
    *                    que los últimos obtenidos sean inferiores a 10, señal de que no hay más registros
    *                    en la bbdd.
    *    Argumentos que recibe: Ninguno
    *    Devuelve: Nada (Void).
    * --------------------------
    */
    const handleLoadMore = () => {
        if(offset % 10 == 0)
            loadWorkouts();
    };
    
    return (
        <Screen style={styles.screen}>
            <FlatList 
                data={workouts}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                keyExtractor={workout => workout.ej_id.toString()}
                onEndReached = {handleLoadMore}
                onEndReachedThreshold = {0.1}
                renderItem={({item}) =>
                    <WorkoutCard 
                        ej_id={item.ej_id}
                        Nombre={item.Nombre}
                        Subtitulo={item.Subtitulo}
                        Descripcion={item.Descripcion}
                        onPress = { () => navigation.navigate(routes.WORKOUT_DETAILS, { workout: item, rut_id: allWorkouts ? null : route.params.rut_id, onGoBack: () => onRefresh() })}
                    />
                }
            />
            {   user.Rol == "Especialista" &&
                <AddButton
                    onPress={() => allWorkouts ? 
                                        navigation.navigate(routes.CREATE_WORKOUT, { Subtitulo: user.Nombre, USUARIOS_Email: user.Email }) 
                                        : 
                                        navigation.navigate(routes.ASSOCIATE, {email: user.Email, item: {RUTINA_rut_id: route.params.rut_id}})
                            } 
                />
            }
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        backgroundColor: colors.lightprimary,
    }
})

export default ListingWorkoutsScreen;
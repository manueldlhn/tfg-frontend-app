/* ---------------------------
 *    Nombre del fichero: ListingRoutinesScreen.js
 *    Descripción: Este fichero contiene la pantalla de listado de rutinas.        
 *    Contenido: 
 *          - ListingRoutinesScreen: Función que regula el comportamiento y el aspecto de la pantalla.        
 * ---------------------------  
 */

import React, { useEffect, useState, useCallback }  from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';

import Screen from '../components/Screen';
import RoutineCard from '../components/cards/RoutineCard';
import colors from '../config/colors';
import routes from '../navigation/routes';
import routinesApi from '../api/routines';
import AddButton from '../components/AddButton';
import useAuth from '../auth/useAuth';
import prescriptionsApi from '../api/prescriptions';

/* --------------------------
 *    Nombre de la Función: ListingRoutinesScreen
 *    Funcionamiento: Carga en la pantalla un listado de rutinas.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - route: Ruta de la pantalla. Se utilizará para extraer los parámetros.
 *                              - navigation: Objeto de navegación. Se utilizará para cambiar de pantalla.
 *    Devuelve: La pantalla renderizada.
 * --------------------------
 */
function ListingRoutinesScreen({ navigation }) {
    // HOOKS
    // Para el listado.
    const [routines, setRoutines] = useState([]);
    // Flag de recarga de la pantalla.
    const [refreshing, setRefreshing] = useState(false);
    // Offset para cargar paulatinamente los datos.
    const [offset, setOffset] = useState(0);
    // Extraemos el email de usuario de los parámetros de route
    const {user} = useAuth();

    // Hook useEffect lanzado al cargar la pantalla para cargar los datos en la lista.
    useEffect(() => {
        loadRoutines();
    }, [])
    
    /* --------------------------
    *    Nombre de la Función: loadRoutines
    *    Funcionamiento: Solicita a la API la información de rutinas.
    *                    Actualiza con el resultado y actualiza el offset para futuras solicitudes.
    *    Argumentos que recibe: Nada.
    *    Devuelve: Nada (void).
    * --------------------------
    */
    const loadRoutines = async () => {
        // Si el rol es de especialista, carga todas las existentes. Si no, sólo cargará las prescritas al usuario.
        const response = user.Rol == "Especialista" ? await routinesApi.getRoutines(offset) : await prescriptionsApi.getRoutinesFromUser(user.Email, offset);
        // Datos actualizados con los nuevos registros.
        setRoutines(routines => routines.concat(response.data));
        // Nuevo Offset
        setOffset(offset => offset + response.data.length);
    }

    /* --------------------------
    *    Nombre de la Función: onRefresh
    *    Funcionamiento: Al deslizar hacia abajo para recargar, se resetean todos los datos
    *                    almacenados de rutinas y offset, y se vuelve a solicitar información
    *                    a la API. Se regula por medio del hook refreshing.
    *    Argumentos que recibe: Ninguno.
    *    Devuelve: Nada (Void).
    * --------------------------
    */
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRoutines(() => []);
        setOffset(() => 0);
        loadRoutines()
        .then(()=> setRefreshing(false));
    }, []);


    /* --------------------------
    *    Nombre de la Función: handleLoadMore
    *    Funcionamiento: Como los datos de rutinas se obtienen de 10 en 10, al alcanzar el final,
    *                    se lanza una nueva petición a la API para solicitar los 10 siguientes, salvo
    *                    que los últimos obtenidos sean inferiores a 10, señal de que no hay más registros
    *                    en la bbdd.
    *    Argumentos que recibe: Ninguno
    *    Devuelve: Nada (Void).
    * --------------------------
    */
    const handleLoadMore = () => {
        if(offset % 10 == 0)
            loadRoutines();
    };
    
    
    return (
        <Screen style={styles.screen}>
            <FlatList 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
                data={routines}
                keyExtractor={routine => routine.rut_id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                renderItem={({item}) =>
                    <RoutineCard
                        rut_id={item.rut_id}
                        Nombre={item.Nombre}
                        Descripcion={item.Descripcion}
                        Info_Rutina={item.Info_Rutina}
                        onPress = { () => navigation.navigate(routes.ROUTINE_DETAILS, item)}
                    />
                }
            />
            {
                user.Rol == "Especialista" &&
                <AddButton 
                    onPress={() => navigation.navigate(routes.CREATE_ROUTINE, { Info_Rutina: user.Nombre, USUARIOS_Email: user.Email })}
                />
            }
            
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding:10,
        backgroundColor: colors.lightprimary,
        
    },
    
})

export default ListingRoutinesScreen;
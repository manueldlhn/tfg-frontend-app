/* ---------------------------
 *    Nombre del fichero: ListingUserPrescriptionsScreen.js
 *    Descripción: Este fichero contiene la pantalla de listado de prescripciones de ejercicio
 *                 o rutina a un usuario concreto.         
 *    Contenido:
 *          - ListingUserPrescriptionsScreen: Función que regula el comportamiento y el aspecto
 *                                            de la pantalla en cuestión.        
 * ---------------------------  
 */

import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';

import prescriptionsApi from '../api/prescriptions';
import useAuth from '../auth/useAuth';
import AddButton from '../components/AddButton';
import PrescriptionCard from '../components/cards/PrescriptionCard';
import Screen from '../components/Screen';
import colors from '../config/colors';
import routes from '../navigation/routes';


/* --------------------------
 *    Nombre de la Función: ListingUserPrescriptionsScreen
 *    Funcionamiento: Carga en la pantalla un listado de prescripciones, ya sea rutinas o ejercicios.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - route: Ruta de la pantalla. Se utilizará para extraer los parámetros.
 *                              - navigation: Objeto de navegación. Se utilizará para cambiar de pantalla.
 *    Devuelve: La pantalla renderizada.
 * --------------------------
 */
function ListingUserPerscriptionsScreen({ route, navigation }) {
    // Extraemos los parámetros de route.
    const {email, type } = route.params;

    // HOOKS
    // Para el listado
    const [data, setData] = useState([]);
    // Flag de recarga de la pantalla
    const [refreshing, setRefreshing] = useState(false);
    // Offset para cargar paulatinamente los datos.
    const [offset, setOffset] = useState(0); 
    // Extraemos el usuario de useAuth. 
    const {user} = useAuth();
    // Modificamos el título de la pantalla según lo solicitado al acceder sean rutinas o ejercicios.
    navigation.setOptions({ title: "Prescripciones de "+type });
    
    // Hook useEffect lanzado al cargar la pantalla para cargar los datos iniciales.
    useEffect( () => {
        loadData();
    }, []);


    /* --------------------------
    *    Nombre de la Función: loadData
    *    Funcionamiento: Solicita a la API la información del tipo de prescripción que proceda.
    *                    Actualiza con el resultado y actualiza el offset para futuras solicitudes.
    *    Argumentos que recibe: Nada.
    *    Devuelve: Nada (void).
    * --------------------------
    */
    const loadData = async () => {
        // Si el tipo de prescripción es rutina, solicitará rutinas. Si es ejercicio, ejercicios.
        const response = type=="Rutina" ? await prescriptionsApi.getRoutinesFromUser(email, offset) : await prescriptionsApi.getWorkoutsFromUser(email, offset);
        
        // Si el usuario no tiene prescripciones del tipo solicitado, se lanza un mensaje de alert, a modo informativo. OJO
        if(data.length + response.data.length == 0){
            alert("Este usuario no tiene "+type+"s entre sus prescripciones.");
            navigation.goBack(); // Se debería mantener ahí con botón de añadir prescripción?
        } else { // Se actualiza datos y offset.
            setData(data => data.concat(response.data));
            setOffset(offset => offset + response.data.length);
        }
    };


    /* --------------------------
    *    Nombre de la Función: onRefresh
    *    Funcionamiento: Al deslizar hacia abajo para recargar, se resetean todos los datos
    *                    almacenados de prescripciones y offset, y se vuelve a solicitar información
    *                    a la API. Se regula por medio del hook refreshing.
    *    Argumentos que recibe: Ninguno.
    *    Devuelve: Nada (Void).
    * --------------------------
    */
    const onRefresh = useCallback( () => {
        setRefreshing(true);
        setData( () => []);
        setOffset( () => 0);
        loadData()
        .then( () => setRefreshing(false));
    }, []);


    /* --------------------------
    *    Nombre de la Función: handleLoadMore
    *    Funcionamiento: Como los datos de prescripciones se obtienen de 10 en 10, al alcanzar el final,
    *                    se lanza una nueva petición a la API para solicitar los 10 siguientes, salvo
    *                    que los últimos obtenidos sean inferiores a 10, señal de que no hay más registros
    *                    en la bbdd.
    *    Argumentos que recibe: Ninguno
    *    Devuelve: Nada (Void).
    * --------------------------
    */
    const handleLoadMore = () => {
        if(offset % 10 == 0)
            loadData();
    };

    
    return (
        <Screen style={styles.container}>
            <FlatList
                data={data}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                keyExtractor={item => type=="Rutina" ? item.rutina_id.toString() : item.ejercicio_id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                renderItem={({item}) => 
                    <PrescriptionCard
                        type = {type}
                        id = {type=="Rutina" ? item.rutina_id : item.ejercicio_id}
                        Nombre = {item.Nombre}
                        Comentarios = {item.Comentarios}
                        onPress = { () => navigation.navigate(routes.PRESCRIPTION_DETAILS, {type: type, item: item, usuario_email:email, onGoBack: () => onRefresh()}) }
                    />
                }
            />
            <AddButton 
                onPress={() => navigation.navigate(routes.PRESCRIBE_TO_USER, { what: type.toLowerCase(), data: {usuario_email: email, especialista_email: user.Email}, onPopTwo: () => onRefresh()})}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.lightprimary,
    }
})

export default ListingUserPerscriptionsScreen;
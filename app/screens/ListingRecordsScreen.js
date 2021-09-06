/* ---------------------------
 *    Nombre del fichero: ListingRecordsScreen.js
 *    Descripción: Este fichero contiene la pantalla de listado de historial de ejercicios de un usuario.        
 *    Contenido: 
 *          - ListingRecordsScreen: Función que regula el comportamiento y el aspecto de la pantalla.        
 * ---------------------------  
 */

import React, {useState, useEffect, useCallback} from 'react';
import { FlatList, RefreshControl, StyleSheet, Alert } from 'react-native';


import Screen from '../components/Screen';
import RecordCard from '../components/cards/RecordCard';
import colors from '../config/colors';
import recordsApi from '../api/records';

/* --------------------------
 *    Nombre de la Función: ListingRecordsScreen
 *    Funcionamiento: Carga en la pantalla un listado de historial de ejercicios de un usuario.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - route: Ruta de la pantalla. Se utilizará para extraer los parámetros.
 *                              - navigation: Objeto de navegación. Se utilizará para cambiar de pantalla.
 *    Devuelve: La pantalla renderizada.
 * --------------------------
 */
function ListingRecordsScreen({ route, navigation }) {
    // HOOKS:
    // Para el listado.
    const [records, setRecords] = useState([]);
    // Flag de recarga de la pantalla.
    const [refreshing, setRefreshing] = useState(false);
    // Offset para cargar paulatinamente los datos.
    const [offset, setOffset] = useState(0);
    // Extraemos el email del usuario de los parámetros de route.
    const email = route.params;

    // Hook useEffect lanzado al cargar la pantalla para cargar los datos en la lista.
    useEffect( () => {
        loadRecords();
    }, []);


    /* --------------------------
    *    Nombre de la Función: loadRecords
    *    Funcionamiento: Solicita a la API la información del histórico de ejercicios de un usuario concreto.
    *                    Comprueba el resultado y actualiza el offset para futuras solicitudes.
    *    Argumentos que recibe: Nada.
    *    Devuelve: Nada (void).
    * --------------------------
    */
    const loadRecords = async () => {
        const response = await recordsApi.getRecordsFromUser(email, offset);
        const data = "data" in response ? response.data : [];
        // Comprobación.
        checkRecords(records, data);
        // Nuevo Offset
        setOffset(offset => offset + response.data.length);
    };

    /* --------------------------
    *    Nombre de la Función: checkRecords
    *    Funcionamiento: Si no existen datos de histórico de ejercicios, lanza un alert informativo
    *                    y vuelve a la pantalla anterior. Si no, actualiza los datos con la información
    *                    recibida de la API.
    *    Argumentos que recibe:
    *           - records: Datos de ejercicios realizados almacenados.
    *           - data: Nuevos datos de ejercicios realizados recibidos de la API.
    *    Devuelve: Nada (Void).
    * --------------------------
    */
    const checkRecords = (records, data) => {
        if(records.length+data.length == 0){
            Alert.alert("No hay datos","No existen registros de "+email+" en el historial.");
            navigation.goBack();
        } else {
            setRecords(records => records.concat(data));
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
    const onRefresh = useCallback( () => {
        setRefreshing(true);
        setRecords( () => []);
        setOffset(() => 0);
        loadRecords()
        .then( () => setRefreshing(false));
    }, []);

    /* --------------------------
    *    Nombre de la Función: handleLoadMore
    *    Funcionamiento: Como los datos del histórico se obtienen de 10 en 10, al alcanzar el final,
    *                    se lanza una nueva petición a la API para solicitar los 10 siguientes, salvo
    *                    que los últimos obtenidos sean inferiores a 10, señal de que no hay más registros
    *                    en la bbdd.
    *    Argumentos que recibe: Ninguno
    *    Devuelve: Nada (Void).
    * --------------------------
    */
    const handleLoadMore = () => {
        if(offset % 10 == 0)
            loadRecords();
    };



    
    return (
        <Screen style={styles.screen}>
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={records}
                keyExtractor={record => record.Fecha_Hora+'-'+record.EJERCICIO_ej_id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                renderItem={({item}) => 
                    <RecordCard
                        ej_id={item.EJERCICIO_ej_id}
                        ej_Nombre={item.EJERCICIO_Nombre}
                        rut_id={item.RUTINA_rut_id}
                        rut_Nombre={item.RUTINA_Nombre}
                        Fecha_Hora={item.Fecha_Hora}
                        Tiempo_ejercicio={item.Tiempo_ejercicio}
                        Info_Adicional={item.Info_Adicional}
                    />
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        backgroundColor: colors.lightprimary,
    }
})

export default ListingRecordsScreen;
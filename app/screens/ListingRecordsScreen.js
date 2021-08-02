import React, {useState, useEffect, useCallback} from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';


import Screen from '../components/Screen';
import RecordCard from '../components/cards/RecordCard';
import colors from '../config/colors';
import recordsApi from '../api/records';


function ListingRecordsScreen({ route, navigation }) {
    const [records, setRecords] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [offset, setOffset] = useState(0);

    const email = route.params;

    useEffect( () => {
        loadRecords();
    }, []);

    const loadRecords = async () => {
        const response = await recordsApi.getRecordsFromUser(email, offset);
        const data = "data" in response ? response.data : [];
        checkRecords(records, data)
        setOffset(offset => offset + response.data.length);
    };

    const checkRecords = (records, data) => {
        if(records.length+data.length == 0){
            alert("No existen registros de "+email+" en el historial.");
            navigation.goBack();
        } else {
            setRecords(records => records.concat(data));
        }
    }

    const onRefresh = useCallback( () => {
        setRefreshing(true);
        setRecords( () => []);
        setOffset(() => 0);
        loadRecords()
        .then( () => setRefreshing(false));
    }, []);

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
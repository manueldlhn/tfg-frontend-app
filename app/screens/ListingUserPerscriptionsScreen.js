import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';

import prescriptionsApi from '../api/prescriptions';
import useAuth from '../auth/useAuth';
import AddButton from '../components/AddButton';
import PrescriptionCard from '../components/cards/PrescriptionCard';
import Screen from '../components/Screen';
import colors from '../config/colors';
import routes from '../navigation/routes';

function ListingUserPerscriptionsScreen({ route, navigation }) {
    
    const {email, type } = route.params;
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [offset, setOffset] = useState(0);  
    const {user} = useAuth();

    navigation.setOptions({ title: "Prescripciones de "+type });
    
    useEffect( () => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = type=="Rutina" ? await prescriptionsApi.getRoutinesFromUser(email, offset) : await prescriptionsApi.getWorkoutsFromUser(email, offset);
        
        if(data.length + response.data.length == 0){
            alert("Este usuario no tiene "+type+"s entre sus prescripciones.");
            navigation.goBack();
        } else {
            setData(data => data.concat(response.data));
            setOffset(offset => offset + response.data.length);
        }
    };

    const onRefresh = useCallback( () => {
        setRefreshing(true);
        setData( () => []);
        setOffset( () => 0);
        loadData()
        .then( () => setRefreshing(false));
    }, []);

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
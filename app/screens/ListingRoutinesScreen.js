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


function ListingRoutinesScreen({ navigation }) {
    
    const [routines, setRoutines] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [offset, setOffset] = useState(0);

    const {user} = useAuth();

    useEffect(() => {
        loadRoutines();
    }, [])
    
    const loadRoutines = async () => {
        
        const response = user.Rol == "Especialista" ? await routinesApi.getRoutines(offset) : await prescriptionsApi.getRoutinesFromUser(user.Email, offset);
        
        console.log(response.data);

        setRoutines(routines => routines.concat(response.data));
        setOffset(offset => offset + response.data.length);
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setRoutines(() => []);
        setOffset(() => 0);
        loadRoutines()
        .then(()=> setRefreshing(false));
    }, []);

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
                        Pub_priv={item.Pub_priv}
                        USUARIOS_Email={item.USUARIOS_Email}
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
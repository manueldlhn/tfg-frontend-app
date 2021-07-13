import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';

import Screen from '../components/Screen';
import AssociationCard from '../components/cards/AssociationCard';
import colors from '../config/colors';
import routes from '../navigation/routes';
import prescriptionsApi from '../api/prescriptions';
import AddButton from '../components/AddButton';
import useAuth from '../auth/useAuth';


function ListingAssociationsScreen({ navigation }) {
    
    const [associations, setAssociations] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [offset, setOffset] = useState(0);

    const { user } = useAuth();

    useEffect( () => {
        loadAssociations();
    }, []);

    const loadAssociations = async () => {
        const response = await prescriptionsApi.getAllAssociations(offset);
        setAssociations(associations => associations.concat(response.data));
        setOffset(offset => offset + response.data.length);
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setAssociations(() => []);
        setOffset(() => 0);
        loadAssociations()
        .then(() => setRefreshing(false));
    }, []);

    const handleLoadMore = () => {
        if(offset % 10 == 0)
            loadAssociations();
    }
    
    return (
        <Screen style={styles.screen}>
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={associations}
                keyExtractor={association => association.RUTINA_rut_id.toString()+'-'+association.EJERCICIO_ej_id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                renderItem={({item}) => 
                    <AssociationCard
                        EJERCICIO_ej_id={item.EJERCICIO_ej_id}
                        RUTINA_rut_id={item.RUTINA_rut_id}
                        USUARIOS_Email={item.USUARIOS_Email}
                        onPress={() => navigation.navigate(routes.ASSOCIATION_DETAILS, {association: item, email: user.Email, onGoBack: () => onRefresh()})}
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

export default ListingAssociationsScreen;
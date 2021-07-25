import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import LiveUserCard from '../components/cards/LiveUserCard';
import colors from '../config/colors';
import mqtt from '../mqtt/mqtt';
import useAuth from '../auth/useAuth';


function WatchingLiveScreen({ navigation }) {
    const {user} = useAuth();
    const [liveUsers, setLiveUsers] = useState([]);

    var mqttClient;
    
    useEffect( ()=> {
        mqttClient = mqtt.getClient({client_id: user.Email, callback: updateLiveUsers});
        setLiveUsers([]);
    }, []);

    const scheduleDeletion = (Usuario) => {
        console.log("Llamado a scheduleDeletion");
        setTimeout( () => {
            const index = liveUsers.findIndex( liveUser => liveUser.Usuario == Usuario);
            const newLiveUsers = liveUsers.splice(index,1);
            setLiveUsers(newLiveUsers);
            console.log("Elemento eliminado");
        }, 10000);
    }

    const updateLiveUsers = (message) => {
        console.log("updateLiveUsers");
        try {
            const userData = JSON.parse(message.payloadString);            
            
            if(userData.Ultimo_msg) scheduleDeletion(userData.Usuario);

            setLiveUsers(liveUsers => {
                var sustituido = false;
                var newLiveUsers = [];
                if (liveUsers.length != 0) {
                    newLiveUsers = liveUsers.map(liveUser => {
                        const element = liveUser.Usuario == userData.Usuario ? userData : liveUser;
                        if(element.Usuario == userData.Usuario) sustituido = true;
                        return element;
                    });
                    console.log(newLiveUsers);
                } 
                if(!sustituido) newLiveUsers = [userData, ...liveUsers];
                return newLiveUsers;
            });


        } catch (error) {
            console.log(error);
        }
        //console.log(liveUsers);
    }

    return (
        <Screen style={styles.screen}>
            { liveUsers != [] &&
            <FlatList 
                data={liveUsers}
                keyExtractor={(liveUser, index) => liveUser.Usuario}
                renderItem={({item}) => 
                    <LiveUserCard
                        Usuario={item.Usuario}
                        Nombre_ej={item.Nombre_ej}
                        Tiempo_ej={item.Tiempo_ej}
                        Ultimo_msg={item.Ultimo_msg}
                        Distancia={"Distancia" in item ? item.Distancia : null}
                        Pasos={"Pasos" in item ? item.Pasos : null}
                    />
                }
            />}
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        backgroundColor: colors.lightprimary,
    }
})

export default WatchingLiveScreen;
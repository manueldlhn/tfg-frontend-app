import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import LiveUserCard from '../components/cards/LiveUserCard';
import colors from '../config/colors';
import mqtt from '../mqtt/mqtt';
import useAuth from '../auth/useAuth';
import constants from '../config/constants';


function WatchingLiveScreen({ navigation }) {
    const {user} = useAuth();
    const [liveUsers, setLiveUsers] = useState([]);
    const DELETETIME = constants.LIVEMSG_DELETE_TIME*1000; // En milisegundos
    const EXPIRYTIME = constants.LIVEMSG_EXPIRY_TIME*1000 // En milisegundos
    var mqttClient;
    
    useEffect( ()=> {
        mqttClient = mqtt.getClient({client_id: user.Email, callback: updateLiveUsers});
        setLiveUsers([]);
    }, []);

    
    const updateLiveUsers = (message) => {
        console.log("updateLiveUsers");
        try {
            var userData = JSON.parse(message.payloadString);           
            userData.expiry = (userData.Ultimo_msg) ? Date.now()+DELETETIME : Date.now()+EXPIRYTIME;

            setLiveUsers(liveUsers => {
                var sustituido = false;
                var newLiveUsers = [];
                if (liveUsers.length != 0) {
                    newLiveUsers = liveUsers.map(liveUser => {
                        const element = (liveUser.Usuario == userData.Usuario) ? userData : liveUser;
                        if(element.Usuario == userData.Usuario) sustituido = true;
                        return element;
                    });
                } 
                if(!sustituido) newLiveUsers = [userData, ...liveUsers];

                // Filtramos los registros expirados
                return newLiveUsers.filter( element => element.expiry > Date.now());
            });
            

        } catch (error) {
            console.log(error);
        }
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
import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import colors from '../config/colors';
import Icon from '../components/Icon';
import Text from '../components/Text';
import Screen from '../components/Screen';
import Button from '../components/Button';
import routes from '../navigation/routes';
import { ListItemSeparator } from '../components/lists';

function UserDetailsScreen({ route, navigation }) {
    const user = route.params;
    return (
        <Screen style={styles.container}>
            <View style={styles.icon}>
                <Icon 
                    name={user.Rol == "Especialista" ? "account-tie" : "account"} 
                    size={45}
                    iconColor={user.Rol=="Especialista" ? colors.primary : colors.secondary} 
                    backgroundColor={colors.lightgreen}
                />
            </View>
            <Text style={styles.name}>{user.Nombre}</Text>
            <ListItemSeparator />
            <View style={styles.info} >
                <Text style={styles.birthdate}>{"Fecha de Nacimiento: "+user.Fecha_Nacimiento}</Text>
                <View style={{marginTop: 25, marginBottom: 25}}>
                    <Text style={styles.contact}>
                        {"Datos de contacto: \n"}
                        {user.Email}
                        {"\n"}
                        {user.Telefono}
                    </Text>
                </View>
                { user.Rol == "Usuario" &&
                <View>
                    <View style={[styles.button, styles.routinesButton]}>
                        <Button 
                            title="Rutinas"
                            onPress={() => navigation.navigate(routes.USER_PRESCRIPTIONS, {email: user.Email, type: "Rutina"})}
                            color="primary"
                            fontColor="white"
                            borderColor="lightprimary"
                            borderWidth={3}
                        />
                    </View>
                    <View style={[styles.button, styles.workoutsButton]}>
                        <Button 
                            title="Ejercicios"
                            onPress={() => navigation.navigate(routes.USER_PRESCRIPTIONS, {email: user.Email, type:"Ejercicio"})}
                            color="secondary"
                            fontColor="white"
                            borderColor="lightgreen"
                            borderWidth={3}
                        />
                    </View>
                    <View style={[styles.button, styles.recordButton]}>
                        <Button 
                            title="Historial"
                            onPress={() => navigation.navigate(routes.USER_RECORDS, user.Email)}
                            color="darkred"
                            fontColor="white"
                            borderColor="lightred"
                            borderWidth={3}
                        />
                    </View>
                </View>
                }
            </View>
        </Screen>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
        backgroundColor: colors.white,
    },
    contact: {
        color: colors.grey
    },
    info: {
        marginTop: 40,
    },
    icon: {
        position: 'absolute',
        top: 10,
        right: 40,
        alignSelf: 'flex-end',
    },
    name: {
        fontWeight: "bold",
        fontSize: 25,
        marginTop: 15,
        marginBottom: 5,
    },
    button: {
        width: "45%",
        height: 30,
        marginTop: 50,
        margin: 10,
        position: "absolute",
    },
    routinesButton: {
        left: 0,
        top: 0,
    },
    workoutsButton: {
        right: 0,
        top: 0,
    },
    recordButton: {
        top: 100,
        alignSelf: "center",
        width: "60%"
    },

})

export default UserDetailsScreen;
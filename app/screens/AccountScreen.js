/* ---------------------------
 *    Nombre del fichero: AccountScreen.js
 *    Descripción: Este fichero contiene la vista de "Mi cuenta".        
 *    Contenido: 
 *          - AccountScreen: Función que renderiza la vista de "Mi cuenta".        
 * ---------------------------  
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import ListItem from '../components/lists/ListItem';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import colors from '../config/colors';
import routes from '../navigation/routes';
import useAuth from '../auth/useAuth';

/* --------------------------
 *    Nombre de la Función: AccountScreen
 *    Funcionamiento: Renderiza la vista de "Mi cuenta".
 *    Argumentos que recibe: Objeto que contiene:
 *                              - navigation: Objeto de navegación para cambiar de pantalla.
 *    Devuelve: La vista renderizada.
 * --------------------------
 */
function AccountScreen({ navigation }) {
    
    // Obtenemos el objeto usuario y la función logOut de useAuth.
    const { user, logOut } = useAuth();

    return (
        <Screen
            style={styles.container}
        >
                <View style={styles.item}>
                    <ListItem 
                        IconComponent={<Icon name="account-edit" backgroundColor={colors.primary}/>}
                        title={user.Nombre}
                        subTitle={user.Email}
                        onPress={() => navigation.navigate(routes.MY_DETAILS, user)}
                    />
                    <ListItemSeparator />
                </View>
                {   user.Rol == "Especialista" &&
                <>
                <View style={styles.item}>
                    <ListItem 
                        IconComponent={<Icon name="radiobox-marked" backgroundColor={colors.red}/>}
                        title="En Directo"
                        subTitle="Hacer seguimiento de usuarios en tiempo real."
                        onPress={() => navigation.navigate(routes.WATCH_LIVE)}
                    />
                    <ListItemSeparator />
                </View>
                </>
                }
                {   user.Rol == "Usuario" &&
                <View style={styles.item}>
                    <ListItem
                        IconComponent={<Icon name="text-box" backgroundColor={"indigo"} />}
                        title="Historial"
                        subTitle="Acceder a mi historial de ejercicios."
                        onPress={() => navigation.navigate(routes.USER_RECORDS, user.Email)}
                    />
                    <ListItemSeparator />
                </View>
                }
                <View style={styles.item}>
                    <ListItem
                        title="Acerca de RemGym"
                        subTitle="Información relacionada con el desarrollo del servicio."
                        IconComponent={<Icon name="information-variant" backgroundColor={colors.secondary} />}
                        onPress={() => navigation.navigate(routes.ABOUT)}
                    />
                    <ListItemSeparator />
                </View>
                <View style={styles.item}>
                    <ListItem
                        title="Cerrar Sesión"
                        IconComponent={<Icon name="logout" backgroundColor="gold" />}
                        onPress={() => logOut()}
                    />
                    <ListItemSeparator />
                </View>            

        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightprimary,
    },
    item: {
        backgroundColor: colors.white,
    },
})

export default AccountScreen;
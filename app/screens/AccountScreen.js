import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import ListItem from '../components/lists/ListItem';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import colors from '../config/colors';
import routes from '../navigation/routes';
import useAuth from '../auth/useAuth';


function AccountScreen({ navigation }) {
    const { user, logOut } = useAuth();


    return (
        <Screen
            style={styles.container}
        >
                <View style={styles.item}>
                    <ListItem 
                        IconComponent={<Icon name="account-edit" color={colors.primary} backgroundColor={colors.primary}/>}
                        title={user.Nombre}
                        subTitle={user.Email}
                        onPress={() => navigation.navigate(routes.MY_DETAILS, user)}
                    />
                    <ListItemSeparator />
                </View>
                {   user.Rol == "Especialista" &&
                <View style={styles.item}>
                    <ListItem 
                        IconComponent={<Icon name="arm-flex" backgroundColor={colors.secondary} />}
                        title="Prescripciones y asociaciones"
                        subTitle="Ver todas las asociaciones realizadas"
                        onPress={() => console.log("Ir a asociaciones")}
                    />
                    <ListItemSeparator />
                </View>
                }
                <View style={styles.item}>
                    <ListItem
                        title="Cerrar Sesión"
                        IconComponent={<Icon name="logout" backgroundColor="gold" />}
                        onPress={() => logOut()}
                    />
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
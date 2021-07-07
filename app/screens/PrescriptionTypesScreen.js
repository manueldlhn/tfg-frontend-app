import React from 'react';
import { View, StyleSheet } from 'react-native';


import Screen from '../components/Screen';
import ListItem from '../components/lists/ListItem';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import Icon from '../components/Icon';
import colors from '../config/colors';
import useAuth from '../auth/useAuth';
import routes from '../navigation/routes';

function PrescriptionTypesScreen({ navigation }) {
    const { user } = useAuth();
    
    return (
        <Screen style={styles.container}>
            <View style={styles.item}>
                    <ListItem
                        IconComponent={<Icon name="calendar-edit" backgroundColor={"indigo"}/>}
                        title="Prescribir Rutina a Usuario"
                        subTitle="Proporciona a un usuario una nueva rutina de ejercicios."
                        onPress={() => navigation.navigate(routes.PRESCRIBE_TO_USER, {what: "rutina"})}
                    />
                    <ListItemSeparator />
            </View>
            <View style={styles.item}>
                    <ListItem
                        IconComponent={<Icon name="file-document-edit" backgroundColor={"goldenrod"}/>}
                        title="Prescribir Ejercicio a Usuario"
                        subTitle="Proporciona a un usuario un nuevo ejercicio."
                        onPress={() => navigation.navigate(routes.PRESCRIBE_TO_USER, {what:"ejercicio"})}
                    />
                    <ListItemSeparator />
            </View>
            <View style={styles.item}>
                    <ListItem
                        IconComponent={<Icon name="text-box-plus" backgroundColor={"olivedrab"}/>}
                        title="Asociar Ejercicio a Rutina"
                        subTitle="Incorpora un ejercicio a una rutina."
                        onPress={() => navigation.navigate(routes.ASSOCIATE, user.Email)}
                    />
                    <ListItemSeparator />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightprimary,
    }
})

export default PrescriptionTypesScreen;
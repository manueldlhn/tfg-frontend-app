import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import colors from '../../config/colors';
import Text from '../Text';

function ListItem({
    title,
    subTitle,
    IconComponent,
    onPress,
    renderRightActions
}) {
    return (
        <Swipeable renderRightActions={renderRightActions} >
            <TouchableHighlight underlayColor={colors.lightgrey} onPress={onPress}>
                <View style={styles.container}>
                    {IconComponent}
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title} numberOfLines={1}>
                            {title}
                        </Text>
                        {subTitle && (
                            <Text style={styles.subTitle} numberOfLines={2}>
                                {subTitle}
                            </Text>
                        )}
                    </View>
                    <MaterialCommunityIcons 
                        color={colors.grey}
                        name="chevron-right"
                        size={25}
                    />
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        backgroundColor: colors.white,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
    },
    subTitle: {
        color: colors.grey,
    }

})

export default ListItem;
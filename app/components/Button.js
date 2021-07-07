import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from '../config/colors';

function AppButton({title, onPress, color="primary", fontColor="white", borderColor="", borderWidth=0}) {
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: colors[color], borderWidth: borderWidth, borderColor: colors[borderColor]}]}
            onPress={onPress}
        >
            <Text style={[styles.text, {color: colors[fontColor]}]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: "100%",
        marginVertical: 10,
    },
    text: {
        color: colors.white,
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
    }
})

export default AppButton;
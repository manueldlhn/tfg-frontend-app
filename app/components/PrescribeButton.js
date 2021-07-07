import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import colors from '../config/colors';

function PrescribeButton(props) {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                name="circle-edit-outline"
                color={colors.primary}
                size={40}
            />
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        height: 80,
        width: 80,
        borderRadius: 40,
        bottom: 5,
        borderColor: colors.primary,
        borderWidth: 10,

    }
})

export default PrescribeButton;
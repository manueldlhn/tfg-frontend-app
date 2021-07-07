import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import colors from '../config/colors';

import Icon from './Icon';

function AddButton({onPress}) {
    return (
        <View style={styles.addButton}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View>
                    <Icon 
                        name="plus-thick"
                        size={50}
                        backgroundColor={colors.secondary}
                        color={colors.white}
                    />
                </View>    
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: "5%",
        right: "10%",
        borderColor: colors.white,
        borderWidth: 2,
        borderRadius: 30
    },
})

export default AddButton;
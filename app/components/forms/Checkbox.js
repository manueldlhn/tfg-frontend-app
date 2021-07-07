import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Text from '../Text';
import colors from '../../config/colors';
import { useFormikContext } from 'formik';

function AppCheckbox({name, title, ...otherProps}) {

    const {setFieldValue, errors, values} = useFormikContext();

    return (
        <View style={styles.checkbox}>
           <Text>{title}</Text>
           <CheckBox 
                disabled={false}
                value={values[name]}
                onValueChange={(value) => setFieldValue(name, value)}
                tintColors={ true ? colors.secondary : colors.grey }
                {...otherProps}
            />            
        </View>
        
    );
}

const styles = StyleSheet.create({
    checkbox: {
        flexDirection: "row",
        
    }
})

export default AppCheckbox;
/* ---------------------------
 *    Nombre del fichero: Checkbox.js
 *    Descripción: Este fichero contiene el componente del checkbox para formularios.        
 *    Contenido: 
 *          - AppCheckbox: Función que recoge el aspecto y funcionamiento del checkbox.        
 * ---------------------------  
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Text from '../Text';
import colors from '../../config/colors';
import { useFormikContext } from 'formik';


/* --------------------------
 *    Nombre de la Función: AppCheckbox
 *    Funcionamiento: Renderiza la vista y el comportamiento del checkbox.
 *    Argumentos que recibe: 
 *                  - name: Nombre del componente en el formulario.
 *                  - title: Título del componente en el formulario.
 *                  - ..otherProps: Propiedades adicionales que se quieran incorporar.
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function AppCheckbox({name, title, ...otherProps}) {

    // Usamos useFormikContext para gestionar el valor del checkbox.
    const {setFieldValue, values} = useFormikContext();

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
/* ---------------------------
 *    Nombre del fichero: TextInput.js 
 *    Descripción: Este fichero contiene el componente de entrada de texto.        
 *    Contenido:
 *          - AppTextInput: Función que recoge el aspecto del componente.        
 * ---------------------------  
 */

import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";



/* --------------------------
 *    Nombre de la Función: AppTextInput
 *    Funcionamiento: Renderiza el componente con los parámetros recibidos.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - icon: Nombre del icono que se mostrará a la izquierda.
 *                              - width: ancho del campo (100% si no se proporciona).
 *                              - editable: Flag para permitir modificar el valor (Se permite si no se especifica).
 *                              - ...otherProps: Otros parámetros que se puedan utilizar.
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function AppTextInput({ icon, width = "100%", editable=true, ...otherProps }) {
  return (
    <View style={[styles.container, { width }, { backgroundColor: editable ? defaultStyles.colors.lightgrey : defaultStyles.colors.grey }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={ editable ? defaultStyles.colors.grey : defaultStyles.colors.darkgrey }
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.grey}
        style={defaultStyles.text}
        editable={editable}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;

/* ---------------------------
 *    Nombre del fichero: FormField.js
 *    Descripción: Este fichero recoge el componente de campo básico del formulario.       
 *    Contenido:
 *        - AppFormField: Función que recoge la vista y el comportamiento de un campo de formulario.        
 * ---------------------------  
 */

import React from 'react';
import { useFormikContext } from 'formik';

import TextInput from '../TextInput';
import Text from '../Text';
import ErrorMessage from './ErrorMessage';



/* --------------------------
 *    Nombre de la Función: AppFormField
 *    Funcionamiento: Renderiza un campo de formulario en base a los parámetros recibidos.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - name: Nombre del campo.
 *                              - width: Ancho del campo.
 *                              - editable: Flag boolean para permitir al usuario de la app modificar el valor o no.
 *                              - title: Título del campo (si no se recibe, se inicializa a false).
 *                              - ...otherProps: Parámetros adicionales que se puedan usar.
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function AppFormField({name, width, editable, title=false, ...otherProps}) {
  // Usamos useFormikContext para gestionar el valor, posible error y comportamiento al pulsar del campo.
  const { setFieldTouched, setFieldValue, errors, touched, values} = useFormikContext();

  return (
    <>
      {title && <Text style={{fontWeight: "bold"}}>{title}</Text>}
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        editable={editable}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
};

export default AppFormField;
/* ---------------------------
 *    Nombre del fichero: SubmitButton.js 
 *    Descripción: Este fichero recoge el componente del botón de submit.        
 *    Contenido:
 *          - SubmitButton: Función que recoge el aspecto y funcionamiento del botón de submit del formulario.        
 * ---------------------------  
 */

import React from 'react';
import { useFormikContext } from 'formik';

import Button from '../Button';

/* --------------------------
 *    Nombre de la Función: SubmitButton
 *    Funcionamiento: Renderiza el componente, definiendo su comportamiento ante ciertos eventos.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - title: Título del botón (a mostrar).
 *                              - color: Color de relleno que deberá tener el botón. Si no se proporciona,
 *                                       se inicializa a primary (definido en el fichero /app/config/colors.js).
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function SubmitButton({title, color="primary"}) {
    const { handleSubmit } = useFormikContext();
    
    return <Button title={title} color={color} onPress={handleSubmit} />;
}

export default SubmitButton;
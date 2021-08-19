/* ---------------------------
 *    Nombre del fichero: Form.js
 *    Descripción: Este fichero contiene el componente básico de formulario, modificado a
 *                 partir del proporcionado por Formik.       
 *    Contenido:
 *          - AppForm: Función que define el formulario.        
 * ---------------------------  
 */

import React from 'react';
import {Formik} from 'formik';

/* --------------------------
 *    Nombre de la Función: AppForm
 *    Funcionamiento: Renderiza el componente del formulario con los parámetros recibidos.
 *    Argumentos que recibe: Objeto que contiene: 
 *                              - initialValues: Valores iniciales de los campos del formulario.
 *                              - onSubmit: Funcion que regula el comportamiento al pulsar el botón submit.
 *                              - validationSchema: Conjunto de restricciones a los posibles valores de cada campo,
 *                                                  que invalidarán el contenido, o permitirán realizar el submit.
 *                              - children: Contenido del formulario.
 *    Devuelve: El componente renderizado.
 * --------------------------
 */

function AppForm({ initialValues, onSubmit, validationSchema, children }) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {() => <>{children}</>}
        </Formik>
    );
}

export default AppForm;
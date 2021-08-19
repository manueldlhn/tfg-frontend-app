/* ---------------------------
 *    Nombre del fichero: index.js
 *    Descripción: Este fichero permite importar todos los componentes de la carpeta forms con una linea en aquellas vistas que se requieran.        
 *    Contenido: Líneas "export" para permitir el uso de todos los componentes.        
 * ---------------------------  
 */


// Formato de uso:
// export {default as <Nombre_comp>} from './Ruta/hasta/el/fichero_sin_extension';

export {default as Checkbox } from './Checkbox';
export {default as Form } from './Form';
export {default as FormField } from './FormField';
export {default as ErrorMessage } from './ErrorMessage';
export {default as SubmitButton } from './SubmitButton';
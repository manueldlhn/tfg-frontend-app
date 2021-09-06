/* ---------------------------
 *    Nombre del fichero: video.js 
 *    Descripción: Este fichero contiene todo el código relacionado con el uso de links de video en la app.        
 *    Contenido: 
 *         
 * ---------------------------  
 */



/* --------------------------
 *    Nombre de la Función: formatVideoUrl
 *    Funcionamiento: Aplica el formato adecuado a la URL del video para que pueda
 *                    ser reproducido correctamente.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - videoUrl: URL del video.
 *    Devuelve: La URL del video en formato adecuado.
 * --------------------------
 */
export default formatVideoUrl = videoUrl => {
    const EMBED_SUBSTR = '/embed/';
    const WATCH_SUBSTR = '/watch?v=';
    var newUrl;
    /*
    FORMATOS:
        - App URL: https://youtu.be/<id_video>
        - Nav URL: https://youtube.com/watch?v=<id_video>&<otras_cosas>
        - URL Ok:  https://youtube.com/embed/<id_video>
    */
    if(videoUrl.search(EMBED_SUBSTR) != -1){// Si es correcta, no se hace nada
        newUrl = videoUrl;
    } else if(videoUrl.search(WATCH_SUBSTR) != -1){ // Si es una url de navegador
        newUrl = videoUrl.replace(WATCH_SUBSTR, EMBED_SUBSTR); // Cambiamos el /watch?v= por /embed/
        newUrl.slice(0, videoUrl.indexOf('&')); // Eliminamos todo lo que haya a partir del & de la url.
    } else { // Video de la app.
        newUrl = videoUrl.replace('youtu.be/','youtube.com'+EMBED_SUBSTR); // Cambiamos el youtu.be por youtube.com/embed/
    }
    return newUrl;
};
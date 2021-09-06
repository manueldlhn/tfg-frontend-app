/* ---------------------------
 *    Nombre del fichero: constants.js
 *    Descripción: Este fichero contiene constantes que se emplearán en diversas
 *                 partes de la app y que por comodidad se deberán modificar aquí.       
 *    Contenido: Objeto que contiene:
 *                  - SERVER_URL: Dirección en el que escucha el servidor web.
 *                  - MQTT_HOST: Dirección del broker MQTT.
 *                  - MQTT_PORT: Puerto en el que escucha el broker MQTT.
 *                  - MQTT_PUBLISH_FREQ: Frecuencia en segundos con la que se puede
 *                                       publicar mensajes en la cola MQTT.
 *                  - LIVEMSG_DELETE_TIME: Tiempo en segundos hasta eliminar una tarjeta
 *                                         de usuario realizando un ejercicio en vivo, una vez ha terminado.
 *                  - LIVEMSG_EXPIRY_TIME: Tiempo en segundos hasta que expire una tarjeta
 *                                         de usuario realizando un ejercicio en vivo, si no se recibe otro antes.       
 * ---------------------------  
 */

export default {
    SERVER_URL: 'http://192.168.1.130:3000',
    MQTT_HOST: 'broker.hivemq.com',
    MQTT_PORT: 8000,
    MQTT_PUBLISH_FREQ: 5,
    LIVEMSG_DELETE_TIME: 10,
    LIVEMSG_EXPIRY_TIME: 240,
};
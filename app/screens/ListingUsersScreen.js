/* ---------------------------
 *    Nombre del fichero: ListingUsersScreen.js
 *    Descripción: Este fichero contiene la pantalla de listado de usuarios.        
 *    Contenido:
 *        - ListingUsersScreen: Función que regula el comportamiento y el aspecto de la pantalla.        
 * ---------------------------  
 */

import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl} from 'react-native';

import Screen from '../components/Screen';
import UserCard from '../components/cards/UserCard';
import colors from '../config/colors';
import routes from '../navigation/routes';
import usersApi from '../api/users';


/* --------------------------
 *    Nombre de la Función: ListingUsersScreen
 *    Funcionamiento: Carga en la pantalla un listado de ejercicios.
 *    Argumentos que recibe: Objeto que contiene:
 *                              - navigation: Objeto de navegación. Se utilizará para cambiar de pantalla.
 *    Devuelve: La pantalla renderizada.
 * --------------------------
 */
function ListingUsersScreen({ navigation }) {
  // HOOKS
  // Para el listado
  const [users, setUsers] = useState([]);
  // Flag de recarga de la pantalla
  const [refreshing, setRefreshing] = useState(false);
  // Offset para cargar paulatinamente los datos
  const [offset, setOffset] = useState(0);


  // Hook useEffect lanzado al cargar la pantalla para cargar los primeros datos.
  useEffect(() => {
    loadUsers();
  }, []);
  

  /* --------------------------
  *    Nombre de la Función: loadUsers
  *    Funcionamiento: Solicita a la API la información de usuarios.
  *                    Actualiza con el resultado y actualiza el offset para futuras solicitudes.
  *    Argumentos que recibe: Nada.
  *    Devuelve: Nada (void).
  * --------------------------
  */
  const loadUsers = async () => {
    // Solicitud a la API
    const response = await usersApi.getUsers(offset);
    // Se actualizan los usuarios y el offset.
    setUsers(users => users.concat(response.data));
    setOffset(offset => offset + response.data.length);
    
  };


  /* --------------------------
  *    Nombre de la Función: onRefresh
  *    Funcionamiento: Al deslizar hacia abajo para recargar, se resetean todos los datos
  *                    almacenados de usuarios y offset, y se vuelve a solicitar información
  *                    a la API. Se regula por medio del hook refreshing.
  *    Argumentos que recibe: Ninguno.
  *    Devuelve: Nada (Void).
  * --------------------------
  */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUsers( () => []);
    setOffset( () => 0);
    loadUsers()
    .then(()=> setRefreshing(false));

  }, []);   

  /* --------------------------
  *    Nombre de la Función: handleLoadMore
  *    Funcionamiento: Como los datos de usuarios se obtienen de 10 en 10, al alcanzar el final,
  *                    se lanza una nueva petición a la API para solicitar los 10 siguientes, salvo
  *                    que los últimos obtenidos sean inferiores a 10, señal de que no hay más registros
  *                    en la bbdd.
  *    Argumentos que recibe: Ninguno
  *    Devuelve: Nada (Void).
  * --------------------------
  */
  const handleLoadMore = () => {
    if(offset % 10 == 0)
      loadUsers();
  };

  

  return (
      <Screen style={styles.screen}>
          <FlatList 
              data={users}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
              }
              keyExtractor={user => user.Email.toString()}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.1}
              renderItem={({item}) =>
                <UserCard
                    Email={item.Email}
                    Nombre={item.Nombre}
                    Rol={item.Rol}
                    onPress = { () => navigation.navigate(routes.USER_DETAILS, item)}
                />
              }
          />
      </Screen>
  );
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        backgroundColor: colors.lightprimary,
    },
})

export default ListingUsersScreen;
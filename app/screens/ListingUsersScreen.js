import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl} from 'react-native';

import Screen from '../components/Screen';
import UserCard from '../components/UserCard';
import colors from '../config/colors';
import routes from '../navigation/routes';
import usersApi from '../api/users';



function ListingUsersScreen({ navigation }) {
  
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    const response = await usersApi.getUsers(offset);
    setUsers(users => users.concat(response.data));
    setOffset(offset => offset + response.data.length);
    
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUsers( () => []);
    setOffset( () => 0);
    loadUsers()
    .then(()=> setRefreshing(false));

  }, []);   

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
                  Enabled={item.Enabled}
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
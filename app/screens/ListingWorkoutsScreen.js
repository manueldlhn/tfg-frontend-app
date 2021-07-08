import React, {useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';

import Screen from '../components/Screen';
import WorkoutCard from '../components/WorkoutCard';
import colors from '../config/colors';
import routes from '../navigation/routes';
import workoutsApi from '../api/workouts';
import AddButton from '../components/AddButton';
import useAuth from '../auth/useAuth';
import prescriptionsApi from '../api/prescriptions';


function ListingWorkoutsScreen({ route, navigation }) {
  const [workouts, setWorkouts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);

  const {user} = useAuth();

  const allWorkouts = route.params == undefined;

  

  useEffect(() => {
      loadWorkouts();
  }, []);
    
  const loadWorkouts = async () => {
    
    const response = allWorkouts ? 
                        (
                            user.Rol == "Especialista" ? await workoutsApi.getWorkouts(offset) : await prescriptionsApi.getWorkoutsFromUser(user.Email, offset)
                        ) : ( 
                            await prescriptionsApi.getWorkoutsFromRoutine(route.params.rut_id, offset)
                        );

    allWorkouts ? setWorkouts(workouts => workouts.concat(response.data)) : formatAndSetWorkouts(workouts, response.data);
    setOffset(offset => offset + response.data.length);
  };

  const formatAndSetWorkouts = (workouts, data) => {
    if(workouts.length+data.length == 0){
        alert("Esta rutina no tiene ejercicios asociados.");
        navigation.goBack();
    } else {
        data.forEach( entry => {
            entry.EJERCICIO_ej.Comentarios = entry.Comentarios;
            workouts.push( entry.EJERCICIO_ej );
        }); 
    }
    

  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setWorkouts(() => []);
    setOffset(() => 0);
    loadWorkouts()
    .then(()=> setRefreshing(false));
  }, []); 

  const handleLoadMore = () => {
      if(offset % 10 == 0)
        loadWorkouts();
  };
  
  return (
    <Screen style={styles.screen}>
        {// Funciona pero da un bug de warning, si da problemas se elimina
        !allWorkouts && navigation.setOptions({ title: "Ejercicios de la Rutina "+route.params.rut_id })}
        <FlatList 
            data={workouts}
            refreshControl={ allWorkouts &&
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
            keyExtractor={workout => workout.ej_id.toString()}
            onEndReached = {handleLoadMore}
            onEndReachedThreshold = {0.1}
            renderItem={({item}) =>
                <WorkoutCard 
                    ej_id={item.ej_id}
                    Nombre={item.Nombre}
                    Subtitulo={item.Subtitulo}
                    Descripcion={item.Descripcion}
                    Estado_forma={item.Estado_forma}
                    Pub_priv={item.Pub_priv}
                    RUTINA_USUARIOS_Email={item.RUTINA_USUARIOS_Email}
                    onPress = { () => navigation.navigate(routes.WORKOUT_DETAILS, item)}
                />
            }
        />
        {   user.Rol == "Especialista" && allWorkouts &&
            <AddButton
                onPress={() => navigation.navigate(routes.CREATE_WORKOUT, { Subtitulo: user.Nombre, RUTINA_USUARIOS_Email: user.Email })} 
            />
        }
    </Screen>
  );
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        backgroundColor: colors.lightprimary,
    }
})

export default ListingWorkoutsScreen;
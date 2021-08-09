import React, {useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';

import Screen from '../components/Screen';
import WorkoutCard from '../components/cards/WorkoutCard';
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
  const allWorkouts = (route.params == undefined || route.params.rut_id == undefined);

  useEffect(() => {
      loadWorkouts();
      !allWorkouts && navigation.setOptions({ title: "Ejercicios de la Rutina "+route.params.rut_id });
  }, []);
    
  const loadWorkouts = async () => {
    
    const response = allWorkouts ? 
                        (
                            user.Rol == "Especialista" ? await workoutsApi.getWorkouts(offset) : await prescriptionsApi.getWorkoutsFromUser(user.Email, offset)
                        ) : ( 
                            await prescriptionsApi.getWorkoutsFromRoutine(route.params.rut_id, offset)
                        );
    allWorkouts ? setWorkouts(workouts => workouts.concat(response.data)) : checkWorkouts(workouts, response.data);
    setOffset(offset => offset + response.data.length);
  };

  const checkWorkouts = (workouts, data) => {
    if(workouts.length+data.length == 0){
        alert("Esta rutina no tiene ejercicios asociados. Para añadir uno, por favor utilice el botón (+) de abajo.");
    } else {
        if(route.params.especialista_email != null) {
            data.forEach(workout => {
                workout.RUTINA_rut_id = route.params.rut_id;
            });
        }
        setWorkouts(workouts => workouts.concat(data));
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
        <FlatList 
            data={workouts}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            keyExtractor={workout => workout.ej_id.toString()}
            onEndReached = {handleLoadMore}
            onEndReachedThreshold = {0.1}
            renderItem={({item}) =>
                <WorkoutCard 
                    ej_id={item.ej_id}
                    Nombre={item.Nombre}
                    Subtitulo={item.Subtitulo}
                    Descripcion={item.Descripcion}
                    onPress = { () => navigation.navigate(routes.WORKOUT_DETAILS, { workout: item, rut_id: allWorkouts ? null : route.params.rut_id, onGoBack: () => onRefresh() })}
                />
            }
        />
        {   user.Rol == "Especialista" &&
            <AddButton
                onPress={() => allWorkouts ? 
                                    navigation.navigate(routes.CREATE_WORKOUT, { Subtitulo: user.Nombre, USUARIOS_Email: user.Email }) 
                                    : 
                                    navigation.navigate(routes.ASSOCIATE, {email: user.Email, item: {RUTINA_rut_id: route.params.rut_id}})
                        } 
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
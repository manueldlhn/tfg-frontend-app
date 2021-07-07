import client from './client';

const endpoint='/Workout';

const createWorkout = workout => client.post(endpoint, workout);
const getWorkouts = offset => client.get(endpoint+'/?offset='+offset);
const getWorkout = ej_id => client.get(endpoint+'/'+ej_id);
const updateWorkout = workout => client.put(endpoint+'/'+workout.ej_id, workout )
const deleteWorkout = ej_id => client.delete(endpoint+'/'+ej_id);


export default {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout,
};
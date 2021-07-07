import client from './client';

const endpoint_WR='/WorkoutRoutine';
const endpoint_UW='/UserWorkout';
const endpoint_UR='/UserRoutine';


const prescribe_WR = workoutRoutine => client.post(endpoint_WR, workoutRoutine);
const prescribe_UW = userWorkout => client.post(endpoint_UW, userWorkout);
const prescribe_UR = userRoutine => client.post(endpoint_UR, userRoutine);

const getWorkoutsFromRoutine = (rut_id, offset) => client.get(endpoint_WR+'/Routine/'+rut_id+'/?offset='+offset);


export default {
    prescribe_WR,
    prescribe_UW,
    prescribe_UR,
    getWorkoutsFromRoutine,
};
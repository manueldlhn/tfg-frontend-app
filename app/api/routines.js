import client from './client';


const endpoint='/Routine';

const createRoutine = routine => client.post(endpoint, routine );
const getRoutines = offset => client.get(endpoint+'/?offset='+offset);
const getRoutine = rut_id => client.get(endpoint+'/'+rut_id);
const updateRoutine = routine => client.put(endpoint+'/'+routine.rut_id, routine )
const deleteRoutine = rut_id => client.delete(endpoint+'/'+rut_id);

export default {
    createRoutine,
    getRoutines,
    getRoutine,
    updateRoutine,
    deleteRoutine,
};
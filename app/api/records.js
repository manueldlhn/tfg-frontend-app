import client from './client';

const endpoint = '/Records';

const addRecord = record => client.post(endpoint, record);
const getRecordsFromUser = (email, offset) => client.get(endpoint+'/User/'+email+'/?offset='+offset);


export default {
    addRecord,
    getRecordsFromUser,
}
import client from './client';

const endpoint_REC = '/Records';

const addRecord = record => client.post(endpoint_REC, record);

export default {
    addRecord,
}
import client from './client';

const endpoint='/User';

const getUsers = offset => client.get(endpoint+'/?offset='+offset);
const getUser = Email => client.get(endpoint+'/'+Email);
const updateUser = user => client.put(endpoint+'/'+user.Email, user);

export default {
    getUsers,
    getUser,
    updateUser
};
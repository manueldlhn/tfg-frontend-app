import client from './client';

const endpoint = '/Auth';

const login = (Email,Password) => client.post(endpoint + '/login', {Email, Password});
const register = user => client.post(endpoint + '/register', user);

export default {
    login,
    register,
};
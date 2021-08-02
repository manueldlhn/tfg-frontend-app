import { create } from 'apisauce';
import authStorage from '../auth/storage';
import constants from '../config/constants.js';

const apiClient = create({
    baseURL: constants.SERVER_URL,
});

apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await authStorage.getToken();
    if(!authToken) return;
    request.headers["x-auth-token"] = authToken;
})

export default apiClient;
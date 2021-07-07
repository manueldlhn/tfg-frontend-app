import { create } from 'apisauce';
import authStorage from '../auth/storage';

const apiClient = create({
    baseURL: 'http://192.168.1.36:3000'
});

apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await authStorage.getToken();
    if(!authToken) return;
    request.headers["x-auth-token"] = authToken;
})

export default apiClient;
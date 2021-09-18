import axios from 'axios';
import { SERVER_API, SERVER_API_AUTH } from '../consts/userConsts';

const $host = axios.create({
    baseURL: SERVER_API
});

const $authHost = axios.create({
    baseURL: SERVER_API_AUTH
});

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
};

import jwt_decode from 'jwt-decode';
import { $authHost, $host } from './index';
import { USER_EMAIL_FIELD, USER_PASSWORD_FIELD } from '../consts/userConsts';

export const registration = async ({ email, password }) => {
    const response = await $host.post('/registration', { email, password });
    return response;
};

export const login = async ({ email, password }) => {
    const response = await $authHost.post('/login', { [USER_EMAIL_FIELD]: email, [USER_PASSWORD_FIELD]: password });

    if (response.status === 200) {

        if (response.data) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        return jwt_decode(response.data.accessToken);

    } return false;
};

export const check = async () => {
    const response = await $host.post('/registration',);
    return response;
};

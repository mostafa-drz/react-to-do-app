import { LOG_OUT, AUTH } from './types';
import axios from 'axios';
import { setTheTokenOnStorage, removeTokenOnStorage } from '../utils/helpers';
import { responseErrorHandler } from "../utils/helpers";

export function authenticate({ auth }) {
    return {
        type: AUTH,
        auth
    }
};

export function logout() {
    return {
        type: LOG_OUT
    }
};

export const logOutOnServer = () => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/logout');
            if (res.status === 200) {
                removeTokenOnStorage();
                dispatch({ type: LOG_OUT });
                return Promise.resolve();
            }
            responseErrorHandler(res);
        } catch (error) {
            return Promise.reject(error.message);
        }
    }
}
export const logInOnServer = ({ email, password }) => {
    return async(dispatch) => {
        try {
            const res = await axios.post('/api/login', { email, password });
            if (res.status === 200) {
                dispatch({ type: AUTH, auth: true });
                setTheTokenOnStorage(res.data.token);
                return Promise.resolve();
            }
            responseErrorHandler(res);

        } catch (error) {
            return Promise.reject(error.message);
        }
    }
}

export const signUpOnServer = ({ email, password }) => {
    return async(dispatch) => {
        try {
            const res = await axios.post('/api/signup', { email, password });
            if (res.status === 200) {
                dispatch({ type: AUTH, auth: true });
                setTheTokenOnStorage(res.data.token);
                return Promise.resolve();
            }
            responseErrorHandler(res);
        } catch (error) {
            return Promise.reject(error.message);
        }
    }
}

export const googleLogInOnTheServer = ({ token }) => {
    return async dispatch => {
        try {
            const res = await axios.get("/api/auth/googleLogin", {
                headers: {
                    googleToken: token
                }
            });
            if (res.status === 200) {
                dispatch({ type: AUTH, auth: true });
                setTheTokenOnStorage(res.data.token);
                return Promise.resolve();
            }
            responseErrorHandler(res);
        } catch (error) {
            return Promise.reject(error.message);
        }
    };
};

export const getCurrentUser = () => {
    return async dispatch => {
        try {
            const res = await axios.get('/api/auth/user');
            if (res.status === 200) {
                dispatch({ type: AUTH, auth: true });
                setTheTokenOnStorage(res.data.token);
                return Promise.resolve();
            }
            responseErrorHandler(res);
        } catch (error) {
            return Promise.reject(error.message);
        }
    }
}
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
            const res = await axios.post('/api/logout', {
                validateStatus: function(status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            });
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
            const res = await axios.post('/api/login', { email, password }, {
                validateStatus: function(status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
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
    }
}

export const signUpOnServer = ({ email, password }) => {
    return async(dispatch) => {
        try {
            const res = await axios.post('/api/signup', { email, password }, {
                validateStatus: function(status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
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
    }
}

export const googleLogInOnTheServer = ({ token }) => {
    return async dispatch => {
        try {
            const res = await axios.get("/api/auth/googleLogin", {
                headers: {
                    googleToken: token
                },
                validateStatus: function(status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
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
            const res = await axios.get('/api/auth/user', {
                validateStatus: function(status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            });
            console.log(res);
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
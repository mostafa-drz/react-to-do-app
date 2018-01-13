import { LOG_OUT, AUTH } from './types';
import axios from 'axios';
import { setTheTokenOnStorage } from '../utils/helpers';
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

export const googleLogInOnTheServer = () => {
    return async dispatch => {
        try {
            const res = await axios.get("/api/auth/google", {
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
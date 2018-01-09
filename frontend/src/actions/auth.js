import { LOGIN, SIGN_UP, LOG_OUT } from './types';
import axios from 'axios';
export function logIn({ email, token }) {
    return {
        type: LOGIN,
        email,
        token
    }
};

export function signup({ email, password }) {
    return {
        type: SIGN_UP,
        email,
        password
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
                dispatch({ type: LOGIN, email, token: res.data.token })
            } else if (res.status === 401) {
                throw Error('The entered email or password is not correct');
            } else {
                throw Error('Something went wrong during log in on the server');
            }
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
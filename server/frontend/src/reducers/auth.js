import { AUTH, LOG_OUT } from '../actions/types';

export default function authReducer(state = null, action) {
    switch (action.type) {
        case AUTH:
            return { authenticated: action.auth };
        case LOG_OUT:
            return { authenticated: false };
        default:
            return state;
    }
}
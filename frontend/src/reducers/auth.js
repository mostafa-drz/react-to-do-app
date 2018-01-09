import { LOGIN, LOG_OUT, SIGN_UP } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case LOGIN:
            return { email: action.email, token: action.token };
            break;
        default:
            return state;
    }
}
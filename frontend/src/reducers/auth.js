import { AUTH } from '../actions/types';

export default function(state = null, action) {
    switch (action.type) {
        case AUTH:
            return { authenticated: action.auth };
        default:
            return state;
    }
}
import { GET_A_DAY_TODS } from '../actions/types';

export default function dayReducer(state = null, action) {
    console.log(action);
    console.log(state);
    switch (action.type) {
        case GET_A_DAY_TODS:
            return action.todos
        default:
            return state;
    }
}
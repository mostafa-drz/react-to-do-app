import { GET_A_DAY_TO_DOS } from '../actions/types';

export default function dayReducer(state = [], action) {
    switch (action.type) {
        case GET_A_DAY_TO_DOS:
            return action.todos;
        default:
            return state;
    }
}
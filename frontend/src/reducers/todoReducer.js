import { ADD_TO_DO, GET_TO_DOS } from '../actions/types';

export default function todoReducer(state = [], action) {
    switch (action.type) {
        case ADD_TO_DO:
            return {
                ...state,
                [action.todo._id]: {
                    ...action
                }
            }
        case GET_TO_DOS:
            return action.todos;
        default:
            return state;
    }
}
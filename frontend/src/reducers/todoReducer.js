import { ADD_TO_DO } from '../actions/types';

export function todoReducer(state = [], action) {
    switch (action.type) {
        case ADD_TO_DO:
            return {
                ...state,
                [action.todo._id]: {
                    ...action
                }
            }
        default:
            return state
    }
}
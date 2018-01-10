import { ADD_TO_DO, GET_TO_DOS, UPDATE_TO_DO } from '../actions/types';

export default function todoReducer(state = [], action) {
    switch (action.type) {
        case ADD_TO_DO:
            return state.concat(action.todo);
        case GET_TO_DOS:
            return action.todos;
        case UPDATE_TO_DO:
            return state.reduce((accu, current) => {
                if (current._id !== action.update._id) {
                    return accu.concat(current);
                }
                return accu.concat(action.update);
            }, [])
        default:
            return state;
    }
}
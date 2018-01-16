import { ADD_TO_DO, GET_TO_DOS, UPDATE_TO_DO, DELETE_A_TO_DO } from '../actions/types';

export default function todoReducer(state = [], action) {
    switch (action.type) {

        case ADD_TO_DO:
            return state.concat(action.todo).sort((a, b) => {
                if (!a.date) {
                    return -1;
                }
                if (a.date < b.date) {
                    return -1;
                }
                return 1;
            });

        case GET_TO_DOS:
            return action.todos;

        case UPDATE_TO_DO:
            return state.reduce((accu, current) => {
                if (current._id !== action.update._id) {
                    return accu.concat(current);
                }
                return accu.concat(action.update);
            }, []);

        case DELETE_A_TO_DO:
            return state.filter((todo) => todo._id !== action._id);

        default:
            return state;
    }
}
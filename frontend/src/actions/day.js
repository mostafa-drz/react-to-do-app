import { GET_A_DAY_TODS } from './types';
import { getRequestConfig, responseErrorHandler } from '../utils/helpers';
import axios from 'axios';
export const getADayTodos = ({ todos }) => {
    return {
        type: GET_A_DAY_TODS,
        todos
    }
}

export const fetchADayToDos = ({ date }) => {
    return async(dispatch) => {
        try {
            const res = await axios.get('/api/todos/date', getRequestConfig(), {
                date
            });
            console.log(res);
            if (res.status == 200) {
                dispatch({ type: GET_A_DAY_TODS, todos: res.data.todos });
                return Promise.resolve();
            }
            responseErrorHandler(res);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
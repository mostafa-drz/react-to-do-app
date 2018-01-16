import { ADD_TO_DO, UPDATE_TO_DO, GET_TO_DOS, DELETE_A_TO_DO, GET_A_DAY_TO_DOS } from './types';
import { getRequestConfig, responseErrorHandler } from '../utils/helpers';
import axios from 'axios';

export function addToDo(todo) {
    return {
        type: ADD_TO_DO,
        ...todo
    };
}

export function updateToDo(update) {
    return {
        type: UPDATE_TO_DO,
        update,
    }
}

export function getToDos() {
    return {
        type: GET_TO_DOS
    }
}

export function deleteAToDo({ _id }) {
    return {
        type: DELETE_A_TO_DO,
        _id
    }
}

export function getADayToDos({ date }) {
    return {
        type: GET_A_DAY_TO_DOS,
        date
    }
}

export const addToDoOnServer = (todo) => {
    return async dispatch => {
        try {
            const res = await axios.post("/api/todos", todo, getRequestConfig());
            if (res.status === 200) {
                dispatch({ type: ADD_TO_DO, todo: res.data });
                return Promise.resolve(res.data);
            } else if (res.status >= 500) {
                throw Error("Something went wrong on the server");
            } else {
                throw Error(res.data.message);
            }
        } catch (error) {
            return Promise.reject(error.message);
        }

    };
}

export const fetchToDos = () => {
    return async(dispatch) => {
        try {
            const res = await axios.get('/api/todos', getRequestConfig());
            if (res.status === 200) {
                dispatch({ type: GET_TO_DOS, todos: res.data.todos });
                return Promise.resolve();
            }
            responseErrorHandler(res);
        } catch (error) {
            return Promise.reject(error.message);
        }
    }
}

export const updateToDoOnTheServer = (update) => {
    return async(dispatch) => {
        try {
            const res = await axios.put('/api/todos', update, getRequestConfig());
            if (res.status === 200) {
                dispatch({ type: UPDATE_TO_DO, update: res.data });
                return Promise.resolve();
            }
            responseErrorHandler(res);
        } catch (error) {
            return Promise.reject(error.message);
        }
    }
}

export const deleteAToDoOnTheServer = ({ _id }) => {
    return async dispatch => {
        try {
            const res = await axios.delete(`/api/todos/${_id}`, getRequestConfig());
            if (res.status === 200) {
                dispatch({ type: DELETE_A_TO_DO, _id });
                return Promise.resolve();
            }
            responseErrorHandler(res);
        } catch (error) {
            return Promise.reject(error.message);
        }
    }
}
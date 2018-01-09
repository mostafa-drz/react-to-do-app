import { ADD_TO_DO, UPDATE_TO_DO, GET_TO_DOS } from './types';
import { getTheTokenOnStorage } from '../utils/helpers';
import axios from 'axios';

export function addToDo(todo) {
    return {
        type: ADD_TO_DO,
        ...todo
    };
}

export function updateToDo(_id, update) {
    return {
        type: UPDATE_TO_DO,
        ...update,
        _id
    }
}

export function getToDos() {
    return {
        type: GET_TO_DOS
    }
}

export const addToDoOnServer = (todo) => {
    return (dispatch) => {
        axios.post('/api/todos')
            .then((res) => {
                if (res.status === 200) {
                    dispatch({ type: ADD_TO_DO, todo: res.data });
                    return Promise.resolve();
                } else if (res.status >= 500) {
                    throw Error('Something went wrong on the server');
                } else {
                    throw Error(res.data.message);
                }
            })
            .catch((error) => {
                return Promise.reject(error);
            })
    }
}

export const fetchToDos = () => {
    return (dispatch) => {
        axios.get('/api/todos', {
            headers: {
                'authorization': getTheTokenOnStorage()
            }
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data);
                dispatch({ type: GET_TO_DOS, todos: res.data.todos });
                return Promise.resolve();
            } else if (res.status >= 500) {
                throw Error('Something went wrong on the server');
            } else {
                throw Error(res.data.message || 'Undefined error message');
            }
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
}
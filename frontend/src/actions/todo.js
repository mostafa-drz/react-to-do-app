import { ADD_TO_DO, UPDATE_TO_DO, GET_TO_DOS, DELETE_A_TO_DO } from './types';
import { getTheTokenOnStorage } from '../utils/helpers';
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

export const addToDoOnServer = (todo) => {
    return (dispatch) => {
        axios
            .post("/api/todos", todo, {
                headers: {
                    authorization: getTheTokenOnStorage()
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({ type: ADD_TO_DO, todo: res.data });
                    return Promise.resolve();
                } else if (res.status >= 500) {
                    throw Error("Something went wrong on the server");
                } else {
                    throw Error(res.data.message);
                }
            })
            .catch(error => {
                return Promise.reject(error);
            });
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

export const updateToDoOnTheServer = (update) => {
    return (dispatch) => {
        axios.put('/api/todos', update, { headers: { 'authorization': getTheTokenOnStorage() } })
            .then((res) => {
                if (res.status === 200) {
                    dispatch({ type: UPDATE_TO_DO, update: res.data });
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

export const deleteAToDoOnTheServer = ({ _id }) => {
    return dispatch => {
        axios
            .delete(`/api/todos/${_id}`, {
                headers: { 'authorization': getTheTokenOnStorage() },
                validateStatus: function(status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            })
            .then(res => {
                if (res.status === 200) {
                    dispatch({ type: DELETE_A_TO_DO, _id });
                    return Promise.resolve();
                } else if (res.status >= 500) {
                    throw Error("Something went wrong on the server");
                } else {
                    throw Error(res.data.message || "Undefined error message");
                }
            })
            .catch(error => {
                return Promise.reject(error);
            });
    };
}
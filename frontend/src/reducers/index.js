import authReducer from './auth';
import todoReducer from './todoReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    auth: authReducer,
    todo: todoReducer,
});
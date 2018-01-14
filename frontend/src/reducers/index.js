import authReducer from './auth';
import todoReducer from './todoReducer';
import dayReducer from './dayReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    auth: authReducer,
    todo: todoReducer,
    day: dayReducer,
});
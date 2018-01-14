import 'materialize-css/dist/css/materialize.min.css';
import "materialize-css/dist/js/materialize.js";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import { applyMiddleware, createStore,compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import {isUserAuthorized} from './utils/helpers';
import reducers from './reducers';
import {AUTH} from './actions/types'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,{},composeEnhancers(applyMiddleware(reduxThunk)));

store.dispatch({type:AUTH,auth:isUserAuthorized()});
window.axios = axios;
ReactDOM.render(
    <Provider store={store}> 
        <App/>
    </Provider> , 
     document.getElementById('root'));
registerServiceWorker();
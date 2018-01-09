import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import { applyMiddleware, createStore,compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk)));
window.axios = axios;
ReactDOM.render(
    <Provider store={store}> 
    < App / >
    </Provider> , 
     document.getElementById('root'));
registerServiceWorker();
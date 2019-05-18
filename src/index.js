import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Thunk from 'redux-thunk';

import rootReducer from './rootReducer';

import './static/css/util.css';
import './static/css/index.css';
import './static/css/custom.css';
import './static/css/page-not-found.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(Thunk))
);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

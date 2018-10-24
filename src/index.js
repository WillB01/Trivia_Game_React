import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import TriviaMainReducer from './store/reducers/TriviaMainReducer';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;

const rootReducer = combineReducers({
    triviaMain: TriviaMainReducer
});

const store = createStore(rootReducer, 
    composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();

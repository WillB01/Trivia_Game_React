import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter}  from 'react-router-dom';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import TriviaMainReducer from './store/reducers/TriviaMainReducer';
import CategoriesReducer from './store/reducers/CategoriesReducer';
import SelectedCategoryReducer from './store/reducers/SelectedCategoryReducer';
import AuthReducer from './store/reducers/AuthReducer';
import HighScoreReducer from './store/reducers/HighScoreReducer';

const composeEnhancers = process.env.NODE_ENV === 'development' 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;

const rootReducer = combineReducers({
    triviaMain: TriviaMainReducer,
    categories: CategoriesReducer,
    selectedCategory: SelectedCategoryReducer,
    auth: AuthReducer,
    highscore: HighScoreReducer
});

const store = createStore(rootReducer, 
    composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();

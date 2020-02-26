import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App'; 
import rootReducer from './reducers/data-reducer';
import {createStore} from 'redux';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<App store={store} />, document.getElementById('root'));



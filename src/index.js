import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App'; 
import rootReducer from './reducers/data-reducer';
import {createStore} from 'redux';

const store = createStore(rootReducer);

ReactDOM.render(<App store={store} />, document.getElementById('root'));



import React from "react"; 
import ReactDOM from "react-dom";
import './CommonStyles/index.scss';
import App from "./App";
import rootReducer from "./reducers/data-reducer";
import {
  createStore,
  compose
} from "redux";

const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
  rootReducer,
  enhancers
);

const root = document.getElementById("workzen-groups"); 


ReactDOM.render(< App store={
  store
} root={root}
/>, root);
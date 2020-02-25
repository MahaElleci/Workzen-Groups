import React from "react";
import Layout from "./components/Layout/layout";

import { Provider } from "react-redux";
import "./App.scss";

const App = ({ store }) => { 
  return (
    <div>
      <Provider store={store}>
        <Layout />
      </Provider>
    </div>
  );
};
export default App;

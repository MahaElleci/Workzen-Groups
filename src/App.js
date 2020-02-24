import React, { Component } from "react";
import Layout from "./components/Layout/layout";
import {data} from "./data/data";
import "./App.scss";

class App extends Component {
  state = {
    staticdata: {}
  };

  componentDidMount() {
  }
  render() { 
    return (
      <div>
        <Layout data={data}/>
      </div>
    );
  }
}
export default App;

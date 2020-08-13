import React from "react";
import MainRouter from "./MainRouter/MainRouter";
import { toast } from "react-toastify";
import { Provider } from "react-redux";

import API_config from "./config";

toast.configure({
  autoClose: 2000,
  hideProgressBar: true,
});
const App = (props) => {
  const token = props.root.getAttribute("data-usertoken");
  const loggedInUserId = props.root.getAttribute("data-userid");
  if (token) {
    API_config.userToken = `Bearer ${token}`;
  }
  if (loggedInUserId) {
    API_config.userId = loggedInUserId;
  }
  return (
    <Provider store={props.store}>
      <MainRouter />
    </Provider>
  );
};
export default App;

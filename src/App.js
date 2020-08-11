import React from "react";
import MainRouter from "./MainRouter/MainRouter";
import { SitecoreContext } from "@sitecore-jss/sitecore-jss-react";
import SitecoreContextFactory from "./Services/sitecoreContextFactory";
import { toast } from "react-toastify";
import API_config from "./config";

import { Provider } from "react-redux";

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
  if(loggedInUserId) {
    API_config.userId = loggedInUserId;
  }
  return (
    <Provider store={props.store}>
      <SitecoreContext contextFactory={SitecoreContextFactory}>
        <MainRouter />
      </SitecoreContext>
    </Provider>
  );
};
export default App;

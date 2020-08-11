import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withSitecoreContext } from "@sitecore-jss/sitecore-jss-react";
import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";
import routes from "./Routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { getUsers_service } from "../Services/sitecore-services";

import { fetchloggedInUserId_service } from "../Services/fetch-services";
import API_config from "../config";

const MainRouter = () => {
  const dispatch = useDispatch();
  async function getLoggedInUserInfo() { 
    const userId = API_config.userId ? API_config.userId :  await getLoggedInUserId();
    const ids = [];
    ids.push(userId);
    const userInfo = await getUsers_service(ids);
    if (userInfo.data[0])
      dispatch({ type: "SET_LOGGED_IN_USER", userObj: userInfo.data[0] });
  }
  async function getLoggedInUserId() { 
    const user = await fetchloggedInUserId_service();
    return user.data;
  }
  useEffect(() => {
    getLoggedInUserInfo();
  }, []);
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={i}
            exact={route.subRoutes.some((r) => r.exact)}
            path={route.subRoutes.map((r) => r.path)}
          >
            <route.layout>
              {route.subRoutes.map((subRoute, i) => (
                <Route key={i} {...subRoute} />
              ))}
            </route.layout>
          </Route>
        ))}
      </Switch>
    </Router>
  );
};
export default withSitecoreContext()(MainRouter);

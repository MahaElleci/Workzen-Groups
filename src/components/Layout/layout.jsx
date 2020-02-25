import React from "react";
import SideNav from "../SideNav/sidenav";
import Feed from "../Feed/feed";
import "./styles.scss";

const Layout = ({ data }) => {
  return (
    <div>
      <div className="layout-header">
        <img alt="logo" src={require("../../assets/zen-logo.PNG")} />
      </div>
      <div className="layout-wrapper">
        <div className="layout-left-content">
          <SideNav data={data.groupsData} />
        </div>
        <div className="layout-main-content">
          <Feed data={data} />
        </div>
        <div className="layout-right-content"></div>
      </div>
    </div>
  );
};
export default Layout;

import React from "react";
import SideNav from "../SideNav/sidenav";
import Feed from "../Feed/feed";
import "./styles.scss";

const Layout = ({ data }) => {
  return (
    <div className="layout-wrapper">
      <div className="layout-left-content">
        <SideNav data={data.groupsData} />
      </div>
      <div className="layout-main-content">
        <Feed data={data.postsData} />
      </div>
      <div className="layout-right-content"></div>
    </div>
  );
};
export default Layout;

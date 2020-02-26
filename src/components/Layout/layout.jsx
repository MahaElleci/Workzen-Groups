import React from "react";
import SideNav from "../SideNav/sidenav";
import Feed from "../Feed/feed"; 
import SideWidget from '../SideWidgets/SideWidgets';
import "./styles.scss";
import { useSelector } from 'react-redux';  
const Layout = () => { 
  const data = useSelector(state => state); 
  return (
    <div>
      <div className="layout-header">
        <img alt="logo" src={require("../../assets/zen-logo.PNG")} />
      </div>
      <div className="layout-wrapper">
        <div className="layout-left-content">
          <SideNav data={data.groupsData} />
        </div> 
        <div className="container">
        <div className="layout-main-content">
          <Feed data={data} />
        </div> 
        </div>
        <div className="layout-right-content">
          <SideWidget header="My Workmates"/>
        </div>
      </div>
    </div>
  );
};
export default Layout;

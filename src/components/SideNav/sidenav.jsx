import React from "react";
import "./styles.scss";

const SideNav = ({ data }) => {
  return (
    <div className="sidenav-wrapper">
      <h5 className="sidenav-wrapper__heading">Groups</h5>
      <div className="sidenav-wrapper__groups">
        {data.userGroups.map(item => {
          return (
            <div className="sidenav-wrapper__groups__items">
              <div className="groupIcon">
              <i class={item.icon} aria-hidden="true"></i>
              </div>
              <p className="groupName">{item.name}</p>
            </div>
          );
        })}
      </div>  
      <h5 className="sidenav-wrapper__heading">Explore</h5>
      <div className="sidenav-wrapper__explore">
      {data.exploreGroups.map(item => {
          return (
            <div className="sidenav-wrapper__groups__items">
              <div className="groupIcon">
              <i class={item.icon} aria-hidden="true"></i>
              </div>
              <p className="groupName">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SideNav;

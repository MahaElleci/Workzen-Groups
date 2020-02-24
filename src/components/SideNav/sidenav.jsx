import React from "react";
import "./styles.scss";
import Icon from "../Shared/IcoMoon/IcoMoon";


const SideNav = ({ data }) => {
  return (
    <div className="sidenav-wrapper">
      <h5 className="sidenav-wrapper__heading">Groups</h5>
      <div className="sidenav-wrapper__groups">
        {data.userGroups.map(item => {
          return (
            <div className="sidenav-wrapper__groups__items">
              <div className="groupIcon">
                <Icon icon={item.icon} size="28" />
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

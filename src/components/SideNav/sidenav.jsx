import React from "react";
import "./styles.scss";
import Icon from "../Shared/IcoMoon/IcoMoon";
import {useSelector} from 'react-redux';
const SideNav = () => { 
  const data = useSelector(state => state.data);  
  return (
    <div className="sidenav-wrapper">
      <h5 className="sidenav-wrapper__heading">Groups</h5>
      <div className="sidenav-wrapper__groups">
        {data.groupsData.userGroups.map((item,i) => {
          return (
            <div key={i} className="sidenav-wrapper__groups__items">
              <div className="groupIcon">
                <Icon icon={item.icon} size="28" />
              </div>
              <p className="groupName">{item.name}</p>
            </div>
          );
        })}
      </div>  
      <h5 className="sidenav-wrapper__heading">Explore</h5>
      <div className="sidenav-wrapper__explore">
      {data.groupsData.exploreGroups.map((item,i) => {
          return (
            <div key={i}className="sidenav-wrapper__groups__items">
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

import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./styles.scss";
const HorizonalGroupTabs = ({ groupId, groupName }) => { 
    console.log("group anem", groupName)
  return (
    <div className="horizontal-wrapper d-md-none">
      <p>{groupName}</p>
      <div className="horizontal-tabs_wrapper">
        <Nav
          activeKey="/home"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <Nav.Item>
            <NavLink to={`/groups/${groupId}/discussion`}>Discussion</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to={`/groups/${groupId}/members`}>Members</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to={`/groups/${groupId}/files`}>Files</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to={`/groups/${groupId}/media`}>Media</NavLink>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
};
export default HorizonalGroupTabs;

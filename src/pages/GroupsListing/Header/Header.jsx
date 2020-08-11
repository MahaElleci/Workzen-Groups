import React from "react";
import { useHistory } from "react-router-dom";
import Icon from "../../../SharedComponents/IcoMoon/IcoMoon";
import "./styles.scss";
const Header = ({ header }) => {
  const history = useHistory();
  return (
    <div className="d-flex align-items-center">
      <Icon
        disableFill={true}
        icon={"left-arrow"}
        size={"16px"}
        color={"#1d3a57"}
        className={"d-md-none"}
        onClick={() => history.push("/")}
      />
      <h5 className="groupsListing-header">{header}</h5>
    </div>
  );
};
export default Header;

import React from "react";
import "./styles.scss";

const InitialsPlaceholder = ({ text, size }) => {
  function getInitials() {
    var segments = text.split(" ");
    var initial = segments.length > 1 ? segments[0].charAt(0) + segments[1].charAt(0) : segments[0].charAt(0);
    return initial;
  }
  function returnInitials() {
    return size==="lg" ? (
      <div className="initials-wrapper--large">
        <p>{getInitials()}</p>
      </div>
    ) : (
      <div className="initials-wrapper--small">
        <p>{getInitials()}</p>
      </div>
    );
  }
  return returnInitials();
};
export default InitialsPlaceholder;

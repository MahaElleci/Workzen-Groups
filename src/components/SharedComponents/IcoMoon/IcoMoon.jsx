// icon.js
import React from "react";
import IcoMoon from "react-icomoon";
const iconSet = require("./selection.json");
 
const Icon = ({ ...props }) => {
  return <IcoMoon iconSet={iconSet} {...props} />;
};
//icon names [ like, comment, photo, attach, group, actions, lamp, edit, dart ] 
export default Icon;
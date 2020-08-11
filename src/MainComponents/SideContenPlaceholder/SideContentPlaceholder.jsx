import React from "react";
import './styles.scss';
const SideContentPlaceholder = ({ children }) => {
  return <div className="sideContent-placeholder d-none d-md-block">{children}</div>;
};
export default SideContentPlaceholder;

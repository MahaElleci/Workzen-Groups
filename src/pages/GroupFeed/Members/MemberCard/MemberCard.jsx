import React from "react";
import { useSelector } from "react-redux";
import "./styles.scss";

const MemberCard = ({ userData, children, membersActions }) => {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const loggedInUserAdmin = useSelector((state) => state.loggedInUserIsAdmin);
  return (
    <div
      className="memberCard-wrapper"
      style={children && { maxWidth: "100%" }}
    >
      <div className="memberCard-wrapper__mainContent">
        <img
          src={
            userData.image
              ? userData.image
              : "https://www.globaleaks.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
          }
          alt="userimage"
        />
        <div className="memberCard-wrapper__mainContent__text">
          <p className="fullName">{userData.displayName}</p>
          <p className="title">{userData.jobTitle}</p>
        </div>
      </div>
      {userData.id != loggedInUser.id &&
        loggedInUserAdmin &&
        !children &&
        membersActions &&
        membersActions(userData)}
      <div className="memberCard-wrapper__children">{children}</div>
    </div>
  );
};
export default MemberCard;

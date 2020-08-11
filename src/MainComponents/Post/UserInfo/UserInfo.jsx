import React from "react";
import JavascriptTimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
import { Link } from "react-router-dom";
import "./styles.scss";
const UserInfo = ({ data, timestamp, isGroup, groupName, groupId }) => {
  JavascriptTimeAgo.locale(en);
  return (
    <div className="groups-userInfo-wrapper">
      <img
        alt="User"
        className="groups-userInfo-wrapper__userImage"
        src={
          data.image
            ? data.image
            : "https://www.globaleaks.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
        }
      />

      <div className="groups-userInfo-wrapper__text">
        <a href="#" className="username">
          {data.displayName}
        </a>
        {/* {!isGroup && <Link to={`/groups/${groupId}`} onClick={() => handleSideNav()}className="groupname"> {groupName} </Link>} */}
        {!isGroup && (
          <Link className="groupname" to={`/groups/${groupId}`}>
            {groupName}
          </Link>
        )}
        <small className="timeStamp">
          <ReactTimeAgo date={new Date(timestamp)} />
        </small>
      </div>
    </div>
  );
};
export default UserInfo;

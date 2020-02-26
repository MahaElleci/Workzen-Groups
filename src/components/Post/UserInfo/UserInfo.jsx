import React from "react";
import "./styles.scss";
const UserInfo = ({ data, timestamp }) => { 
  console.log(data)
  return (
    <div className="userInfo-wrapper">
      <img
        alt="User"
        className="userInfo-wrapper__userImage"
        src={data.image ? data.image : "https://www.globaleaks.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"}
      />

      <div className="userInfo-wrapper__text">
        <a href="#" className="username">
          {data.firstName} {data.lastName}
        </a>
        <small className="timeStamp">{timestamp}</small>
      </div>
    </div>
  );
};
export default UserInfo;

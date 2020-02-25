import React from "react";
import "./styles.scss";
const UserInfo = ({ data, timestamp }) => {
  return (
    <div className="userInfo-wrapper">
      <img
        alt="User"
        className="userInfo-wrapper__userImage"
        src={data.image}
      />

      <div className="userInfo-wrapper__text">
        <a href="#" className="username">
          {data.name}
        </a>
        <small className="timeStamp">{timestamp}</small>
      </div>
    </div>
  );
};
export default UserInfo;

import React from "react";
import './styles.scss';
const UserInfo = ({ data }) => {
  return (
    <div className="userInfo-wrapper">
      <img className="userInfo-wrapper__userImage" src={data.image} />

      <div className="userInfo-wrapper__text">
        <a href="#" className="username">{data.name}</a>
        <small className="timeStamp">2 mins ago</small>
      </div>
    </div>
  );
};
export default UserInfo;

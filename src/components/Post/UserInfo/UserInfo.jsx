import React from "react";

const UserInfo = ({ data }) => {
  return (
    <div className="userInfo-wrapper">
      <img src={data.image} />

      <div className="userInfo-Text">
        <p className="username">{data.name}</p>
        <small class="timeStamp">2 mins ago</small>
      </div>
    </div>
  );
};
export default UserInfo;

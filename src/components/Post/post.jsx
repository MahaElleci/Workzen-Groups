import React from "react";  
import UserInfo from './UserInfo/UserInfo'
import './styles.scss';

const Post = ({ data }) => {
  return (
    <div className="post-wrapper">  
      <UserInfo data={data.userInfo}/>
      <p className="post-wrapper__content">{data.content}</p>
    </div>
  );
};
export default Post;

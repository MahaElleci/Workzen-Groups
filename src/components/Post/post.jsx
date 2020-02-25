import React from "react";
import UserInfo from "./UserInfo/UserInfo";
import Button from "../Shared/Button/Button";
import CommentBox from "../Post/Comment-Box/CommentBox";
import "./styles.scss";
import UserActions from "./UserActions/UserActions";
import ContributionCount from "./ContributionCount/ContributionCount";
import CommentItem from "./CommentItem/CommentItem";

const Post = ({ data, loggedInUser }) => {
  return (
    <div className="post-wrapper">
      <UserInfo data={data.userInfo} timestamp={data.timeCreated} />
      <p className="post-wrapper__content">{data.content}</p>
      <div className="post-wrapper__contributions">
        <ContributionCount data={data} />
      </div>
      <div className="post-wrapper__post-actions">
        <UserActions />
      </div>
      <div className="post-wrapper__comments-wrapper">
        {data.commentList &&
          data.commentList.map((item, i) => {
            return <CommentItem key={i} data={item} />;
          })}
      </div>
      <div className="post-wrapper__comment-row">
        <CommentBox postID={data.id} user={loggedInUser}/>
      </div>
    </div>
  );
};
export default Post;

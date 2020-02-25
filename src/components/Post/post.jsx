import React from "react";
import UserInfo from "./UserInfo/UserInfo";
import Button from "../Shared/Button/Button";
import CommentBox from "../Post/Comment-Box/CommentBox";
import "./styles.scss";
import UserActions from "./UserActions/UserActions";
import ContributionCount from "./ContributionCount/ContributionCount";

const Post = ({ data }) => {
    return (
        <div className="post-wrapper">
            <UserInfo data={data.userInfo} />
            <p className="post-wrapper__content">{data.content}</p>
            <div className="post-wrapper__contributions">
                <ContributionCount data={data} />
            </div>
            <div className="post-wrapper__post-actions">
                <UserActions />
            </div>
            <div className="post-wrapper__comment-row">
                <CommentBox />
                <Button text={"Post"} />
            </div>
        </div>       
    );       
};
export default Post;
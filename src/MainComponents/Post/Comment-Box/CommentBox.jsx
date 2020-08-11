import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Button from "../../../SharedComponents/Button/Button";

import { addComment_service } from "../../../Services/comment-services";

import "./styles.scss";
import Icon from "../../../SharedComponents/IcoMoon/IcoMoon";
import { useEffect } from "react";

const CommentBox = ({ post, isGroup, commentTriggered }) => {
  JavascriptTimeAgo.locale(en);
  const dispatch = useDispatch();
  const [commentValue, setCommentValue] = useState("");
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const innerRef = useRef(null);

  function handleSubmit() {
    if (commentValue.trim() != "") {
      const commentObj = {
        commentText: commentValue,
        postid: post.id,
        commentsListPaging: { data: [] },
      };
      addComment(commentObj);
    }
  }

  function commentUsingEnter(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  async function addComment(commentObj) {
    const response = await addComment_service(commentObj);
    console.log("add comment res=> ", response);
    if (response.data && response.status === 200) {
      dispatch({
        type: "ADD_COMMENT",
        newComment: response.data,
        postId: response.data.postId,
        commentCount: post.commentCount,
        feed: isGroup ? "postsData" : "recentPostsData",
      });
      setCommentValue("");
    }
  }
  useEffect(() => {
    if (commentTriggered.clicked === true) {
      innerRef.current.focus();
    }
  }, [commentTriggered]);
  return (
    <div className="groups-comment-action">
      <div className="post-card__comment-box">
        <img
          alt="userimage"
          className="userImage"
          src={
            loggedInUser.image
              ? loggedInUser.image
              : "https://www.globaleaks.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
          }
        />
        <input
          ref={innerRef}
          type="text"
          placeholder="Write a comment"
          value={commentValue}
          onChange={(event) => setCommentValue(event.target.value)}
          onKeyDown={(e) => commentUsingEnter(e)}
        ></input>
      </div>
      <Icon
        className="post-card__comment-icon"
        icon="send"
        onClick={handleSubmit}
        disableFill="true"
        color={"#1d3a57"}
        size="20"
      />
    </div>
  );
};
export default CommentBox;

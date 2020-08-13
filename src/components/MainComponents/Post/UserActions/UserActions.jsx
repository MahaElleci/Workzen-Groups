import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Icon from "../../../SharedComponents/IcoMoon/IcoMoon";

import {
  likePost_service,
  unlikePost_service,
} from "../../../../Services/post-services";

import "./styles.scss";

const UserActions = ({ data, isGroup, commentTriggerEvent }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(data.isLiked);

  function toggleLikeAction() {
    !liked ? likePost() : unLikePost();
  }

  async function likePost() {
    const response = await likePost_service(data.id);
    if (response.status === 200) {
      setLiked(true);
      isGroup
        ? dispatch({
            type: "LIKE_POST",
            postId: data.id,
            likeCount: data.likeCount,
            feed: "postsData",
          })
        : dispatch({
            type: "LIKE_POST",
            postId: data.id,
            likeCount: data.likeCount,
            feed: "recentPostsData",
          });
    }
  }

  async function unLikePost() {
    const response = await unlikePost_service(data.id);
    if (response.status === 204) {
      setLiked(false);
      dispatch({
        type: "DISLIKE_POST",
        postId: data.id,
        likeCount: data.likeCount,
        feed: isGroup ? "postsData" : "recentPostsData",
      });
    }
  }

  return (
    <div className="groups-actions-wrapper">
      <button
        onClick={() => toggleLikeAction()}
        className="groups-actions-wrapper__btn"
      >
        <Icon
          disableFill="true"
          color={liked ? "#F97304" : "#555e71"}
          icon="like"
          size="16"
        />
        <span className="groups-actions-wrapper__btn-text">Like</span>
      </button>
      <button
        className="groups-actions-wrapper__btn"
        onClick={(e) => commentTriggerEvent(e)}
      >
        <Icon icon="comment" size="16" />
        <span className="groups-actions-wrapper__btn-text">Comment</span>
      </button>
    </div>
  );
};
export default UserActions;

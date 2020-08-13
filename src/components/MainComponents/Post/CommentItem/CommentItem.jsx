import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import Dropdown from "../../../components/SharedComponents/Dropdown/Dropdown";

import JavascriptTimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
import axios from "axios";

import {
  editComment_service,
  deleteComment_service,
} from "../../../Services/comment-services";
import { getUsers_service } from "../../../Services/sitecore-services";

import "./styles.scss";

function CommentItem({ commentData, loggedInUser, commentCount, isGroup }) {
  JavascriptTimeAgo.locale(en);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(commentData.commentText);
  const innerRef = useRef(null);
  const [ownerInfo, setOwnerInfo] = useState({});

  async function getOwnerInfo(cancelToken) {
    const user = await getUsers_service(commentData.userId, cancelToken);
    const userInfo = user.data[0];
    setOwnerInfo(userInfo);
  }
  function returnDropdown() {
    const commentActions = [
      {
        id: 1,
        title: "Edit",
        icon: "edit-post",
        onClick: () => setEdit(true),
      },
      {
        id: 2,
        title: "Delete",
        icon: "trash",
        class: "warning",
        onClick: () => deleteComment(commentData.id),
      },
    ];

    return (
      <div className="group-options">
        <Dropdown items={commentActions} />
      </div>
    );
  }
  function deleteComment(commentId) {
    const response = deleteComment_service(commentId);
    response.then(() => {
      dispatch({
        type: "DELETE_COMMENT",
        postId: commentData.postId,
        commentId: commentId,
        commentCount: commentCount,
        feed: isGroup ? "postsData" : "recentPostsData",
      });
    });
  }
  function editComment() {
    const commentObj = commentData;
    commentObj["commentText"] = editValue;
    const response = editComment_service(commentData.id, commentObj);
    if (response) {
      dispatch({
        type: "EDIT_COMMENT",
        postId: commentData.postId,
        commentId: commentData.id,
        commentText: editValue,
        feed: isGroup ? "postsData" : "recentPostsData",
      });
      setEdit(false);
    }
  }
  function cancelEditComment() {
    setEdit(false);
    setEditValue(commentData.commentText);
  }
  useEffect(() => {
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();

    getOwnerInfo(source.token);
    if (edit) innerRef.current.focus();

    return function () {
      source.cancel();
    };
  }, [commentData.userId, edit]);
  return (
    <div className="groups-comment">
      <img
        alt="User"
        className="groups-comment__user-image"
        src={
          ownerInfo.image
            ? ownerInfo.image
            : "https://www.globaleaks.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
        }
      />

      <div className="groups-comment__text">
        <div className="groups-comment__user-text">
          <a href="#" className="username">
            {ownerInfo.displayName}
          </a>
          <small className="time-stamp">
            <ReactTimeAgo date={new Date(commentData.createdDate)} />
          </small>
        </div>
        {edit ? (
          <div className="groups-comment__edit-mode">
            <input
              className="groups-comment__edit-input"
              onChange={(e) => setEditValue(e.target.value)}
              value={editValue}
              ref={innerRef}
            />
            <button
              className="btn groups-comment__save-edited"
              onClick={() => editComment()}
            >
              Save
            </button>
            <button
              className="btn groups-comment__cancel-edited"
              onClick={() => cancelEditComment()}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="groups-comment__content">{editValue}</div>
        )}
      </div>
      {commentData.userId === loggedInUser.id && (
        <div className="comment-actions">{returnDropdown()}</div>
      )}
    </div>
  );
}

export default CommentItem;

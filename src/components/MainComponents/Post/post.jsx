import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import UserInfo from "./UserInfo/UserInfo";
import CommentBox from "./Comment-Box/CommentBox";
import Dropdown from "../../components/SharedComponents/Dropdown/Dropdown";
import UserActions from "./UserActions/UserActions";
import ContributionCount from "./ContributionCount/ContributionCount";
import CommentItem from "./CommentItem/CommentItem";
import axios from "axios";

import modal from "../../components/SharedComponents/Modal/Modal";
import Button from "../../components/SharedComponents/Button/Button";
import { toast } from "react-toastify";

import {
  editPost_service,
  deletePost_service,
  viewPost_service,
} from "../../Services/post-services";
import { getUsers_service } from "../../Services/sitecore-services";
import { getComments_service } from "../../Services/comment-services";

import Loader from "../../components/SharedComponents/Loader/Loader";

import "./styles.scss";

const Post = ({ data, loggedInUser, isGroup, isMember, isVisible }) => {
  const dispatch = useDispatch();
  const comments = data.commentsListPaging
    ? data.commentsListPaging
    : { data: [], paging: {} };
  const [editMode, setEditMode] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const [editValue, setEditValue] = useState(data.text);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [modalType, setmodalType] = useState("");
  const [showDeletemodal, setShowmodal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(comments.paging.nextPage);

  const [ownerInfo, setOwnerInfo] = useState({});

  async function getOwnerInfo(cancelToken) {
    const user = await getUsers_service(data.userId, cancelToken);
    const userInfo = user.data[0];
    setOwnerInfo(userInfo);
  }
  function showConfirmation(show) {
    setmodalType("Delete");
    setShowmodal(show);
  }
  function returnDropdown() {
    const postOwnerActions = [
      {
        id: 1,
        title: "Edit",
        icon: "edit-post",
        onClick: () => enableEditMode(),
      },
      {
        id: 2,
        title: "Delete",
        icon: "trash",
        class: "warning",
        onClick: () => showConfirmation(true),
      },
    ];

    return (
      <div className="group-options">
        <Dropdown items={postOwnerActions} />
      </div>
    );
  }
  async function editPost() {
    const postObj = data;
    postObj["text"] = editValue;
    const response = await editPost_service(data.id, postObj);
    dispatch({
      type: "EDIT_POST",
      id: data.id,
      text: editValue,
      feed: isGroup ? "postsData" : "recentPostsData",
    });
    cancelEdit();
  }
  function deletePost() {
    setShowmodal(false);
    const response = deletePost_service(data.id);
    response.then(() => {
      dispatch({
        type: "DELETE_POST",
        id: data.id,
        feed: isGroup ? "postsData" : "recentPostsData",
      });
      toast("Post Deleted!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "groups-toast",
      });
    });
  }
  async function viewPost() {
    const response = await viewPost_service(data.id);
    if (response.status === 200) {
      dispatch({
        type: "SEEN_POST",
        postId: data.id,
        seenCount: data.seenCount,
        feed: isGroup ? "postsData" : "recentPostsData",
      });
    }
    console.log(response);
  }
  function handleSeenBy(isViewed) {
    if (isViewed && !data.isSeen) {
      viewPost();
    }
  }
  useEffect(() => {
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();

    getOwnerInfo(source.token);
    handleSeenBy(isVisible);
    comments.paging.nextPage ? setShowLoadMore(true) : setShowLoadMore(false);

    return function () {
      source.cancel();
    };
  }, [data.userId, isVisible]);

  function enableEditMode() {
    setmodalType("Edit");
    setEditMode(true);
  }

  function cancelEdit() {
    setEditMode(false);
  }
  function handleCommentTrigger(e) {
    setCommentClicked({ event: e, clicked: true });
  }
  async function handleLoadMoreComments() {
    setIsLoading(true);
    const response = await getComments_service(
      data.id,
      pageNumber,
      comments.data.length
    );
    if (response.data.data) {
      setPageNumber(response.data.paging.nextPage);
      if (!response.data.paging.nextPage) setShowLoadMore(false);
      dispatch({
        type: "LOAD_MORE_COMMENTS",
        newComments: response.data.data,
        postId: data.id,
        feed: isGroup ? "postsData" : "recentPostsData",
      });
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  const postTextArea = (
    <textarea
      autoFocus="true"
      className="groups-edit-placeholder"
      value={editValue}
      onChange={(event) => setEditValue(event.target.value)}
    />
  );

  return (
    <div className="groups-post-wrapper">
      <UserInfo
        data={ownerInfo}
        isGroup={isGroup}
        groupName={data.groupName}
        timestamp={data.createdDate}
        groupId={data.groupid}
      />

      {data.userId === loggedInUser.id && (
        <div className="post-actions">{returnDropdown()}</div>
      )}
      <div className="groups-post-wrapper__edit-modal">
        <modal
          header={`${modalType} post`}
          onClose={
            modalType === "Edit"
              ? () => setEditMode(false)
              : () => showConfirmation(false)
          }
          shown={modalType === "Edit" ? editMode : showDeletemodal}
          centered="true"
          body={
            modalType === "Edit"
              ? postTextArea
              : "Are you sure you want to delete this post?"
          }
        >
          <Button
            className={modalType === "Edit" ? "submit-btn" : "warning-btn"}
            text={modalType === "Edit" ? "Save" : "Delete"}
            size={"medium"}
            onSubmitHandler={
              modalType === "Edit" ? () => editPost() : () => deletePost()
            }
          />
          <Button
            className="primary-light"
            text={"Cancel"}
            size={"medium"}
            onSubmitHandler={
              modalType === "Edit"
                ? () => cancelEdit()
                : () => showConfirmation(false)
            }
          />
        </modal>
      </div>
      <p className="groups-post-wrapper__content">{data.text}</p>
      <div className="groups-post-wrapper__contributions">
        <ContributionCount data={data} />
      </div>
      <div className="groups-post-wrapper__post-actions">
        <UserActions
          data={data}
          loggedInUser={loggedInUser}
          isGroup={isGroup}
          commentTriggerEvent={(e) => handleCommentTrigger(e)}
        />
      </div>
      <div className="groups-post-wrapper__comments-wrapper">
        {comments.data &&
          comments.data.map((item) => {
            return (
              <CommentItem
                isGroup={isGroup}
                key={item.id}
                commentData={item}
                loggedInUser={loggedInUser}
                commentCount={data.commentCount}
              />
            );
          })}
        {showLoadMore &&
          (isLoading ? (
            <div className="loader-placeholder">
              <Loader />
            </div>
          ) : (
            <div className="groups-post-wrapper__load-more">
              <div
                className="load-more-btn"
                onClick={() => handleLoadMoreComments()}
              >
                Load more comments
              </div>
            </div>
          ))}
      </div>
      <div className="groups-post-wrapper__comment-row">
        {isGroup && isMember && (
          <CommentBox
            commentTriggered={commentClicked}
            post={data}
            loggedInUser={loggedInUser}
            isGroup={isGroup}
          />
        )}
        {!isGroup && (
          <CommentBox
            commentTriggered={commentClicked}
            post={data}
            loggedInUser={loggedInUser}
            isGroup={isGroup}
          />
        )}
      </div>
    </div>
  );
};
export default Post;

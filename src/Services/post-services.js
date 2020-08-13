import dataRequester from "../Requesters/dataRequester";

export const getLikes_service = function (groupId, postId) {
  return dataRequester({
    method: "get",
    url: `/like?groupId=${groupId}&postId=${postId}`,
  });
};

export const likePost_service = function (postId) {
  return dataRequester({
    method: "post",
    url: `/like?postId=${postId}`,
  });
};

export const viewPost_service = function (postId) {
  return dataRequester({
    method: "post",
    url: `/seen?postId=${postId}`,
  });
};

export const getSeenList_service = function (postId) {
  return dataRequester({
    method: "get",
    url: `/seen?postId=${postId}`,
  });
};

export const unlikePost_service = function (postId) {
  return dataRequester({
    method: "delete",
    url: `/like?postId=${postId}`,
  });
};

export const editPost_service = function (postId, postObj) {
  return dataRequester({
    method: "put",
    url: `/posts/${postId}`,
    data: postObj,
  });
};

export const deletePost_service = function (postId) {
  return dataRequester({
    method: "delete",
    url: `/Posts/${postId}`,
  });
};

export const addPost_service = function (groupId, postObj) {
  return dataRequester({
    method: "post",
    url: `/Posts?groupid=${groupId}`,
    data: postObj,
  });
};

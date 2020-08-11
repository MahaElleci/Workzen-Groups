import dataRequester from "../Requesters/dataRequester";

export const getLikes_service = async function (groupId, postId) {
  return await dataRequester({
    method: "get",
    url: `/like?groupId=${groupId}&postId=${postId}`,
  });
};

export const likePost_service = async function (postId) {
  return await dataRequester({
    method: "post",
    url: `/like?postId=${postId}`,
  });
};

export const viewPost_service = async function (postId) {
  return await dataRequester({
    method: "post",
    url: `/seen?postId=${postId}`,
  });
};

export const getSeenList_service = async function (postId) {
  return await dataRequester({
    method: "get",
    url: `/seen?postId=${postId}`,
  });
};

export const unlikePost_service = async function (postId) {
  return await dataRequester({
    method: "delete",
    url: `/like?postId=${postId}`,
  });
};

export const editPost_service = async function (postId, postObj) {
  return await dataRequester({
    method: "put",
    url: `/posts/${postId}`,
    data: postObj,
  });
};

export const deletePost_service = async function (postId) {
  return await dataRequester({
    method: "delete",
    url: `/Posts/${postId}`,
  });
};

export const addPost_service = async function (groupId, postObj) {
  return await dataRequester({
    method: "post",
    url: `/Posts?groupid=${groupId}`,
    data: postObj,
  });
};

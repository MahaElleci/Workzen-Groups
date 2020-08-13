import dataRequester from "./Requesters/dataRequester";

export const editComment_service = function (commentId, commentObj) {
  return dataRequester({
    method: "put",
    url: `/Comments/${commentId}`,
    data: commentObj,
  });
};
export const deleteComment_service = function (commentId) {
  return dataRequester({
    method: "delete",
    url: `/Comments/${commentId}`,
  });
};

export const addComment_service = function (commentObj) {
  return dataRequester({
    method: "post",
    url: `/Comments`,
    data: commentObj,
  });
};

export const getComments_service = function (postId, pageNumber, skip) {
  return dataRequester({
    method: "get",
    url: `/Comments/paging?postId=${postId}&pageNumber=${pageNumber}&skip=${skip}`,
  });
};

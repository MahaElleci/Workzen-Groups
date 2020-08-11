import dataRequester from "../Requesters/dataRequester";

export const editComment_service = async function (commentId, commentObj) {
  return await dataRequester({
    method: "put",
    url: `/Comments/${commentId}`,
    data: commentObj,
  });
};
export const deleteComment_service = async function (commentId) {
  return await dataRequester({
    method: "delete",
    url: `/Comments/${commentId}`,
  });
};

export const addComment_service = async function (commentObj) {
  return await dataRequester({
    method: "post",
    url: `/Comments`,
    data: commentObj,
  });
};

export const getComments_service = async function (postId, pageNumber, skip) {
  return await dataRequester({
    method: "get",
    url: `/Comments/paging?postId=${postId}&pageNumber=${pageNumber}&skip=${skip}`,
  });
};

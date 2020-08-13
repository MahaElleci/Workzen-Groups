import sitecoreRequester from "./Requesters/sitecoreRequester";

function usersMapper(data) {
  var membersIds = [];
  if (typeof data === "string") {
    membersIds.push(data);
  }
  if (typeof data === "object") {
    if (typeof data[0] === "string") {
      membersIds = data;
    } else {
      data.forEach((item) => {
        membersIds.push(item.userId);
      });
    }
  }
  return membersIds;
}
export const getUsers_service = async function (body, cancelToken) {
  let mappedData = body && usersMapper(body);
  return sitecoreRequester({
    method: "post",
    url: `/users`,
    data: mappedData,
    cancelToken: cancelToken,
  });
};
export const searchUsers_service = function (keyword, body) {
  return sitecoreRequester({
    method: "get",
    url: `/users/${keyword}`,
    data: body,
  });
};

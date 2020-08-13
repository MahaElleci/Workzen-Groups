import dataRequester from "../Requesters/dataRequester";

export const deleteGroup_service = function (groupId) {
  return dataRequester({
    method: "delete",
    url: `/Groups/${groupId}`,
  });
};
export const editGroup_service = function (groupId, groupObj) {
  return dataRequester({
    method: "put",
    url: `/groups/${groupId}`,
    data: groupObj,
  });
};

export const addAdmin_service = function (groupId, userid) {
  return dataRequester({
    method: "put",
    url: `/Groups/SetMemberAsAdmin/${groupId}?userid=${userid}`,
  });
};

export const removeAdmin_service = function (groupId, userid) {
  return dataRequester({
    method: "put",
    url: `/Groups/SetAdminAsMember/${groupId}?userid=${userid}`,
  });
};
export const removeMember_service = function (groupId, userid) {
  return dataRequester({
    method: "put",
    url: `/Groups/RemoveMember/${groupId}?userid=${userid}`,
  });
};
export const approveRequests_service = function (groupId, requests) {
  return dataRequester({
    method: "PUT",
    url: `/Groups/ApproveJoinRequestForUsersList/${groupId}`,
    data: requests,
  });
};
export const rejectRequests_service = function (groupId, requests) {
  return dataRequester({
    method: "PUT",
    url: `/Groups/DeclineJoinRequestForUsersList/${groupId}`,
    data: requests,
  });
};

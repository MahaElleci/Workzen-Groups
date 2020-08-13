import dataRequester from "./Requesters/dataRequester";

export const createGroup_service = function (groupObj) {
  return dataRequester({
    method: "post",
    url: `/Groups`,
    data: groupObj,
  });
};

export const leaveGroup_service = function (groupId) {
  return dataRequester({
    method: "put",
    url: `/groups/LeaveGroup/${groupId}`,
  });
};

export const joinPublicGroup_service = function (groupId) {
  return dataRequester({
    method: "post",
    url: `/groups/JoinPublicGroup/${groupId}`,
  });
};

export const joinPrivateGroup_service = function (groupId) {
  return dataRequester({
    method: "post",
    url: `/groups/RequestToJoin/${groupId}`,
  });
};

export const cancelRequest_service = function (groupId) {
  return dataRequester({
    method: "put",
    url: `/groups/CancelJoinRequest/${groupId}`,
  });
};

export const addMembers_service = function (groupId, memberList) {
  return dataRequester({
    method: "put",
    data: memberList,
    url: `/groups/AddMemberList/${groupId}`,
  });
};

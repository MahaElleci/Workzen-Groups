import dataRequester from "../Requesters/dataRequester";

export const fetchloggedInUserId_service = async function () {
  return await dataRequester({
    method: "get",
    url: `/Users/GetUserId`,
  });
}; 
export const fetchTopActiveGroups_service = async function () {
  return await dataRequester({
    method: "get",
    url: `/Groups/TopActiveGroups`,
  });
};  
export const fetchTopActiveExploreGroups_service = async function () {
  return await dataRequester({
    method: "get",
    url: `/Groups/TopActiveExploreGroups`,
  });
};

export const fetchGroupData_service = async function (groupId) {
  return await dataRequester({
    method: "get",
    url: `/Groups/${groupId}`,
  });
};

export const fetchMyGroupData_service = async function (pageNum,skip) {
  return await dataRequester({
    method: "get",
    url: `/Groups/MyGroups?pageNumber=${pageNum}&skip=${skip}`,
  });
};

export const fetchDiscoverGroupsData_service = async function (pageNum,skip) {
  return await dataRequester({
    method: "get",
    url: `/Groups/DiscoverGroups?pageNumber=${pageNum}&skip=${skip}`,
  });
};

export const fetchUsers_service = async function () {
  return await dataRequester({
    method: "get",
    url: `/Users`,
  });
};

export const fetchRecentPosts_service = async function (pageNum, skip) {
  return await dataRequester({
    method: "get",
    url: `/Posts/RecentPosts?pageNumber=${pageNum}&skip=${skip}`,
  });
};

export const fetchGroupPosts_service = async function (groupId,pageNum,skip) {
  return await dataRequester({
    method: "get",
    url: `/Posts/Paging?groupId=${groupId}&pageNumber=${pageNum}&skip=${skip}`,
  });
};
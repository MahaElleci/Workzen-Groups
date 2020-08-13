import dataRequester from "../Requesters/dataRequester";

export const fetchloggedInUserId_service = function (cancelToken) {
  return dataRequester({
    method: "get",
    url: `/Users/GetUserId`,
    cancelToken: cancelToken,
  });
};
export const fetchTopActiveGroups_service = function () {
  return dataRequester({
    method: "get",
    url: `/Groups/TopActiveGroups`,
  });
};
export const fetchTopActiveExploreGroups_service = function () {
  return dataRequester({
    method: "get",
    url: `/Groups/TopActiveExploreGroups`,
  });
};

export const fetchGroupData_service = function (groupId, cancelToken) {
  return dataRequester({
    method: "get",
    url: `/Groups/${groupId}`,
    cancelToken: cancelToken,
  });
};

export const fetchMyGroupData_service = function (pageNum, skip, cancelToken) {
  return dataRequester({
    method: "get",
    url: `/Groups/MyGroups?pageNumber=${pageNum}&skip=${skip}`,
    cancelToken: cancelToken,
  });
};

export const fetchDiscoverGroupsData_service = function (
  pageNum,
  skip,
  cancelToken
) {
  return dataRequester({
    method: "get",
    url: `/Groups/DiscoverGroups?pageNumber=${pageNum}&skip=${skip}`,
    cancelToken: cancelToken,
  });
};

export const fetchUsers_service = function () {
  return dataRequester({
    method: "get",
    url: `/Users`,
  });
};

export const fetchRecentPosts_service = function (pageNum, skip, cancelToken) {
  return dataRequester({
    method: "get",
    url: `/Posts/RecentPosts?pageNumber=${pageNum}&skip=${skip}`,
    cancelToken: cancelToken,
  });
};

export const fetchGroupPosts_service = function (groupId, pageNum, skip) {
  return dataRequester({
    method: "get",
    url: `/Posts/Paging?groupId=${groupId}&pageNumber=${pageNum}&skip=${skip}`,
  });
};

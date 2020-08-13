import React, { useEffect, useState } from "react";

import GroupHeader from "./Header/Header";
import GroupCard from "./GroupCard/GroupCard";
import Button from "../../components/Shared/Button/Button";
import Spinner from "../../components/Shared/Loader/Loader";
import axios from "axios";
import {
  fetchMyGroupData_service,
  fetchDiscoverGroupsData_service,
} from "../../Services/fetch-services";

import "./styles.scss";

const GroupsListing = ({ type }) => {
  const [myGroupsData, setMyGroupsData] = useState([]);
  const [discoverGroupsData, setDiscoverData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [skip, setSkip] = useState(0);

  function setGroupHeader() {
    window.scrollTo(0, 0);
    return type === "MyGroups" ? "Groups I'm In" : "Discover Groups";
  }

  async function fetchMyGroupsData(cancelToken) {
    setLoading(true);
    const response = await fetchMyGroupData_service(pageNum, skip, cancelToken);
    if (response) {
      setMyGroupsData([...myGroupsData, ...response.data.data]);
      if (response.data.paging.nextPage) {
        setNextPage(response.data.paging.nextPage);
      } else {
        setNextPage(null);
      }
    }
    setLoading(false);
  }
  async function fetchDiscoverData(cancelToken) {
    setLoading(true);
    const response = await fetchDiscoverGroupsData_service(
      pageNum,
      skip,
      cancelToken
    );
    if (response) {
      setDiscoverData([...discoverGroupsData, ...response.data.data]);
      if (response.data.paging.nextPage) {
        setNextPage(response.data.paging.nextPage);
      } else {
        setNextPage(null);
      }
    }
    setLoading(false);
  }
  function handleLoadMore() {
    setPageNum(nextPage);
    type === "MyGroups"
      ? setSkip(myGroupsData.length)
      : setSkip(discoverGroupsData.length);
  }

  useEffect(() => {
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();

    type === "MyGroups"
      ? fetchMyGroupsData(source.token)
      : fetchDiscoverData(source.token);
  }, [pageNum]);
  return (
    <div className="groupsListing-wrapper">
      <GroupHeader header={setGroupHeader()} />
      <div className="groupsListing-wrapper__content">
        {type === "MyGroups"
          ? myGroupsData.map((item, i) => {
              return <GroupCard isMember={true} key={i} data={item} />;
            })
          : discoverGroupsData.map((item, i) => {
              return <GroupCard isMember={false} key={i} data={item} />;
            })}
      </div>
      <div className="loadMore-listing">
        {nextPage && !isLoading && (
          <Button
            className={"primary"}
            onSubmitHandler={handleLoadMore}
            text={"Load More"}
            size="medium"
          />
        )}
      </div>

      {isLoading && (
        <div className="spinner-placeholder">
          <Spinner />
        </div>
      )}
    </div>
  );
};
export default GroupsListing;

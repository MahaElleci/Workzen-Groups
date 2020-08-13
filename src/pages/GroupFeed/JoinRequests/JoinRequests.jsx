import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import HeaderBar from "../../../components/SharedComponents/HeaderBar/HeaderBar";
import Button from "../../../components/SharedComponents/Button/Button";
import UserCard from "../Members/MemberCard/MemberCard";
import Spinner from "../../../components/SharedComponents/Loader/Loader";
import {
  approveRequests_service,
  rejectRequests_service,
} from "../../../Services/groupAdmin-services";
import { getUsers_service } from "../../../Services/sitecore-services";

import "./styles.scss";

const JoinRequests = ({ groupId }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const groupJoinRequests = useSelector(
    (state) => state.selectedGroupData.joinRequestList
  );
  const [requestsInfo, setRequestsInfo] = useState([]);
  async function fetchRequestsInfo(cancelToken) {
    setIsLoading(true);
    const response = await getUsers_service(groupJoinRequests, cancelToken);
    setRequestsInfo(response.data);
    setIsLoading(false);
  }
  useEffect(() => {
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();

    if (groupJoinRequests && groupJoinRequests.length > 0) {
      fetchRequestsInfo(source.token);
    }

    return function () {
      source.cancel();
    };
  }, [groupJoinRequests]);

  async function approveRequests(requests) {
    const response = await approveRequests_service(groupId, requests);
    if (response) {
      dispatch({
        type: "FETCH_GROUPS_DATA",
        selectedGroupData: response.data,
      });
    }
  }

  async function rejectRequests(requests) {
    const response = await rejectRequests_service(groupId, requests);
    if (response) {
      dispatch({
        type: "FETCH_GROUPS_DATA",
        selectedGroupData: response.data,
      });
    }
  }
  return (
    <>
      <HeaderBar title={"Group join requests"}>
        <div className="requests-actions">
          <Button
            className={"primary"}
            text={"Approve All"}
            size={"medium"}
            disabled={
              groupJoinRequests && groupJoinRequests.length > 0 ? false : true
            }
            onSubmitHandler={() => approveRequests(groupJoinRequests)}
          />

          <Button
            className={"primary-light"}
            disabled={
              groupJoinRequests && groupJoinRequests.length > 0 ? false : true
            }
            text={"Reject All"}
            size={"medium"}
            onSubmitHandler={() => rejectRequests(groupJoinRequests)}
          />
        </div>
      </HeaderBar>

      <div className="joinRequests-wrapper">
        {groupJoinRequests && groupJoinRequests.length > 0 && (
          <p className="requests-number">{`You have ${groupJoinRequests.length} request`}</p>
        )}
        {isLoading && <Spinner />}
        {groupJoinRequests && groupJoinRequests.length > 0 ? (
          requestsInfo.map((item) => {
            return (
              <div className="joinRequest">
                <UserCard userData={item}>
                  <Button
                    className="primary"
                    text={"Approve"}
                    size={"medium"}
                    onSubmitHandler={() => approveRequests([item.id])}
                  />
                  <Button
                    className="primary-light"
                    text={"Reject"}
                    size={"medium"}
                    onSubmitHandler={() => rejectRequests([item.id])}
                  />
                </UserCard>
              </div>
            );
          })
        ) : (
          <p className="empty-requests">No requests at the moment</p>
        )}
      </div>
    </>
  );
};
export default JoinRequests;

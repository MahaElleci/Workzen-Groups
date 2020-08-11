import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import { Row } from "react-bootstrap";
import { toast } from "react-toastify";

import Spinner from "../../SharedComponents/Loader/Loader";
import PopUp from "../../SharedComponents/Modal/Modal";
import Button from "../../SharedComponents/Button/Button";
import Media from "../../pages/GroupFeed/Media/Media";
import Discussion from "../../pages/GroupFeed/Discussion/Discussion";
import Members from "../../pages/GroupFeed/Members/Members";
import Files from "../../pages/GroupFeed/Files/Files";
import Coverphoto from "./CoverPhoto/CoverPhoto";
import JoinRequests from "./JoinRequests/JoinRequests";
import Dropdown from "../../SharedComponents/Dropdown/Dropdown";
import Settings from "./Settings/Settings";

import {
  fetchGroupData_service,
  fetchGroupPosts_service,
} from "../../Services/fetch-services";

import { deleteGroup_service } from "../../Services/groupAdmin-services";

import "./styles.scss";
import HorizonalGroupTabs from "../../MainComponents/HorizontalGroupTabs/HorizontalGroupTabs";

const GroupFeed = (props) => {
  let isMemberBool;
  let isPrivateBool;
  let isAdminBool;
  let adminList;
  let id = props.match.params.id;
  let url = props.match.url;

  const loggedInUserIsAdmin = useSelector((state) => state.loggedInUserIsAdmin);
  const [isMember, setIsMember] = useState(null);
  const [isAdmin, setIsAdmin] = useState(loggedInUserIsAdmin);
  const [isJoinRequested, setIsJoinRequested] = useState(null);
  const [isPrivateFeed, setIsPrivateFeed] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [groupId, setGroupId] = useState("");
  const postsData = useSelector(state => state.postsData)
  const dispatch = useDispatch();
  const history = useHistory();

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedInUserAdmin, setIsLoggedInUserAdmin] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [pageNum, setPageNum] = useState(1); 
  const [groupName, setGroupName] = useState(""); 
  function showConfirmation(show) {
    setShowPopup(show);
  }
  function showGroupSettings() {
    history.push(`/groups/${id}/settings`);
  }
  function showJoinRequests() {
    history.push(`/groups/${id}/requests`);
  }
  const fetchGroupData = async () => {
    setLoading(true);
    const response = await fetchGroupData_service(id);
    adminList = response.data.memberListPaging.data
      ? response.data.memberListPaging.data.filter((member) => member.isAdmin === true)
      : [];
    isMemberBool = response.data.memberListPaging.data.some(
      (member) => member.userId === loggedInUser.id
    );
    isAdminBool = adminList.some((admin) => admin.userId === loggedInUser.id);
    isPrivateBool = !isMemberBool && response.data.privacy === "Private";
    const group_posts = response.data.postListPaging
      ? response.data.postListPaging
      : { data: [], paging: {} };
    group_posts.paging.nextPage
      ? setNextPage(response.data.postListPaging.paging.nextPage)
      : setNextPage(null);
    setGroupId(response.data.id);
    setIsMember(isMemberBool); 
    setGroupName(response.data.name)
    setIsJoinRequested(response.data.isJoinRequested);
    setIsPrivateFeed(isPrivateBool);
    dispatch({
      type: "FETCH_GROUPS_DATA",
      selectedGroupData: response.data,
    });
    dispatch({
      type: "FETCH_POSTS",
      posts: group_posts.data,
      feed: "GroupFeed",
    });
    setIsLoggedInUserAdmin(response.data.isLoggedInUserAdmin);
    dispatch({ type: "SET_IS_ADMIN", admin: isAdminBool });
    setLoading(false);
  };

  async function fetchGroupPosts() {
    const response = await fetchGroupPosts_service(groupId, nextPage, postsData.length);
    response.data.paging.nextPage
      ? setNextPage(response.data.paging.nextPage)
      : setNextPage(null);
    dispatch({
      type: "FETCH_POSTS",
      posts: response.data.data,
      feed: "GroupFeed",
    });
  }
  useEffect(() => { 
    if(loggedInUser.id){
     fetchGroupData(); 
    }
    window.scrollTo(0, 0);
  }, [loggedInUser]);

  function handleLoadMore() {
    setPageNum(nextPage); 
    fetchGroupPosts();
  }

  function deleteGroup() {
    setShowPopup(false);
    const response = deleteGroup_service(id);
    response.then(() => {
      toast("Group deleted!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "groups-toast",
        onClose: () => history.push("/workzen-socialfeed"),
      });
    });
  }

  function returnDropdown() {
    const groupOptionsAdmin = [
      {
        id: 1,
        title: "Edit Group",
        icon: "edit-post",
        onClick: () => showGroupSettings(),
      },
      {
        id: 2,
        title: "Delete Group",
        icon: "trash",
        onClick: () => showConfirmation(true),
      },
      {
        id: 3,
        title: "Join Requests",
        icon: "users",
        onClick: () => showJoinRequests(),
      },
    ];
    const groupOptionsMember = [
      {
        id: 0,
        title: "No Actions available",
        icon: "",
        onClick: () => console.log("No Actions available"),
      },
    ];
    return (
      <div className="group-options">
        <Dropdown
          items={isLoggedInUserAdmin ? groupOptionsAdmin : groupOptionsMember}
        />
      </div>
    );
  }
  return (
    <>
      <PopUp
        header="Confirm Delete Group"
        body="Are you sure you want to delete this group?"
        onClose={() => showConfirmation(false)}
        shown={showPopup}
        centered="true"
      >
        <Button
          className="warning-btn"
          text={"Delete"}
          size={"medium"}
          onSubmitHandler={() => deleteGroup()}
        />
        <Button
          className="primary-light"
          text={"Cancel"}
          size={"medium"}
          onSubmitHandler={() => showConfirmation(false)}
        />
      </PopUp>
      <Row className="group-cover" noGutters="true">
        <Coverphoto
          image={
            "https://roundpeg.biz/wp-content/uploads/2015/01/MarketingIcons-Cover.jpg"
          }
          isLoading={isLoading}
          isMember={isMember}
          isJoinRequested={isJoinRequested}
        >
          {returnDropdown()}
        </Coverphoto> 
        <HorizonalGroupTabs groupId={id} groupName={groupName}/>
      </Row>
      <div className="groups-tabs-wrapper">
        {isLoading ? (
          <div className="loader-placeholder">
            <Spinner />
          </div>
        ) : (
          <Switch>
            <Route
              exact
              path={url}
              render={() => <Redirect to={`${url}/discussion`} />}
            />
            <Route
              key={"group-discussion"}
              exact
              activeClassName="active"
              path={`${url}/discussion`}
              render={(props) => (
                <Discussion
                  isPrivateFeed={isPrivateFeed}
                  {...props}
                  groupId={id}
                  handleLoadMore={handleLoadMore}
                  nextPage={nextPage} 
                  isMember={isMember}
                />
              )}
            />
            <Route
              key={"group-members"}
              exact
              path={`${url}/members`}
              render={(props) => <Members {...props} groupId={id} />}
            />
            <Route
              key={"group-files"}
              exact
              path={`${url}/files`}
              render={(props) => <Files {...props} groupId={id} />}
            />
            <Route
              key={"group-media"}
              exact
              path={`${url}/media`}
              render={(props) => <Media {...props} groupId={id} />}
            />
            <Route
              key={"group-settings"}
              exact
              path={`${url}/settings`}
              render={(props) => <Settings {...props} groupId={id} />}
            />
            <Route
              key={"group-requests"}
              exact
              path={`${url}/requests`}
              render={(props) => (
                <JoinRequests
                  {...props}
                  groupId={id}
                  isLoggedInUserAdmin={isLoggedInUserAdmin}
                />
              )}
            />
          </Switch>
        )}
      </div>
    </>
  );
};
export default GroupFeed;

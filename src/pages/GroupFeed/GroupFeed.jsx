import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";

import Spinner from "../../components/Shared/Loader/Loader";
import AppModal from "../../components/Shared/Modal/Modal";
import Button from "../../components/Shared/Button/Button";
import Media from "../../pages/GroupFeed/Media/Media";
import Discussion from "../../pages/GroupFeed/Discussion/Discussion";
import Members from "../../pages/GroupFeed/Members/Members";
import Files from "../../pages/GroupFeed/Files/Files";
import Coverphoto from "./CoverPhoto/CoverPhoto";
import JoinRequests from "./JoinRequests/JoinRequests";
import Dropdown from "../../components/Shared/Dropdown/Dropdown";
import Settings from "./Settings/Settings";
import HorizonalGroupTabs from "../../components/Main/HorizontalGroupTabs/HorizontalGroupTabs";

import {
  fetchGroupData_service,
  fetchGroupPosts_service,
} from "../../Services/fetch-services";
import { deleteGroup_service } from "../../Services/groupAdmin-services";

import "./styles.scss";

const GroupFeed = (props) => {
  const id = props.match.params.id;
  const url = props.match.url;

  const postsData = useSelector((state) => state.postsData);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const loggedInUserIsAdmin = useSelector((state) => state.loggedInUserIsAdmin);

  const [showmodal, setShowmodal] = useState(false);
  const [initialState, setInitialState] = useState({
    isMember: false,
    isJoinRequested: false,
    isLoggedInUserAdmin: loggedInUserIsAdmin,
    isPrivateFeed: false,
    groupId: "",
    nextPage: null,
    groupName: "",
    pageNum: null,
    isLoading: false,
    showmodal: false,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const fetchGroupData = async (cancelToken) => {
    setInitialState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    const response = await fetchGroupData_service(id, cancelToken);

    const adminList = response.data.memberListPaging.data
      ? response.data.memberListPaging.data.filter(
          (member) => member.isAdmin === true
        )
      : [];

    const isMemberBool = response.data.memberListPaging.data.some(
      (member) => member.userId === loggedInUser.id
    );

    const isAdminBool = adminList.some(
      (admin) => admin.userId === loggedInUser.id
    );

    const isPrivateBool = !isMemberBool && response.data.privacy === "Private";

    const group_posts = response.data.postListPaging
      ? response.data.postListPaging
      : { data: [], paging: {} };

    group_posts.paging.nextPage
      ? setInitialState((prev) => ({
          ...prev,
          nextPage: response.data.postListPaging.paging.nextPage,
        }))
      : setInitialState((prev) => ({
          ...prev,
          nextPage: null,
        }));

    // Update our initial state
    setInitialState(
      (prev) => ({
        ...prev,
        groupId: response.data.id,
        isMember: isMemberBool,
        groupName: response.data.name,
        isJoinRequested: response.data.isJoinRequested,
        isPrivateFeed: isPrivateBool,
        isLoggedInUserAdmin: response.data.isLoggedInUserAdmin,
      }),
      console.log("initialState: ", initialState)
    );

    // Dispatch values to the store
    dispatch({
      type: "FETCH_GROUPS_DATA",
      selectedGroupData: response.data,
    });
    dispatch({
      type: "FETCH_POSTS",
      posts: group_posts.data,
      feed: "GroupFeed",
    });
    dispatch({ type: "SET_IS_ADMIN", admin: isAdminBool });
    //==========================================//

    setInitialState((prev) => ({
      ...prev,
      isLoading: false,
    }));
  };

  async function fetchGroupPosts() {
    const response = await fetchGroupPosts_service(
      initialState.groupId,
      initialState.nextPage,
      postsData.length
    );
    response.data.paging.nextPage
      ? setInitialState((prev) => ({
          ...prev,
          nextPage: response.data.paging.nextPage,
        }))
      : setInitialState((prev) => ({
          ...prev,
          nextPage: null,
        }));
    dispatch({
      type: "FETCH_POSTS",
      posts: response.data.data,
      feed: "GroupFeed",
    });
  }

  useEffect(() => {
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();

    fetchGroupData(source.token);
    window.scrollTo(0, 0);

    return function () {
      source.cancel();
    };
  }, [loggedInUser]);

  function handleLoadMore() {
    setInitialState((prev) => ({
      ...prev,
      pageNum: initialState.nextPage,
    }));
    fetchGroupPosts();
  }

  function deleteGroup() {
    setShowmodal(false);
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
        onClick: () => history.push(`/groups/${id}/settings`),
      },
      {
        id: 2,
        title: "Delete Group",
        icon: "trash",
        onClick: () => setShowmodal(true),
      },
      {
        id: 3,
        title: "Join Requests",
        icon: "users",
        onClick: () => history.push(`/groups/${id}/requests`),
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
          items={
            initialState.isLoggedInUserAdmin
              ? groupOptionsAdmin
              : groupOptionsMember
          }
        />
      </div>
    );
  }

  // JSX
  return (
    <>
      <AppModal
        header="Confirm Delete Group"
        body="Are you sure you want to delete this group?"
        onClose={() => setShowmodal(false)}
        shown={showmodal}
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
          onSubmitHandler={() => setShowmodal(false)}
        />
      </AppModal>
      <Row className="group-cover" noGutters="true">
        <Coverphoto
          image={
            "https://roundpeg.biz/wp-content/uploads/2015/01/MarketingIcons-Cover.jpg"
          }
          isLoading={initialState.isLoading}
          isMember={initialState.isMember}
          isJoinRequested={initialState.isJoinRequested}
        >
          {returnDropdown()}
        </Coverphoto>
        <HorizonalGroupTabs groupId={id} groupName={initialState.groupName} />
      </Row>
      <div className="groups-tabs-wrapper">
        {initialState.isLoading ? (
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
                  isPrivateFeed={initialState.isPrivateFeed}
                  {...props}
                  groupId={id}
                  isLoading={initialState.isLoading}
                  handleLoadMore={handleLoadMore}
                  nextPage={initialState.nextPage}
                  isMember={initialState.isMember}
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
                  isLoggedInUserAdmin={initialState.isLoggedInUserAdmin}
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

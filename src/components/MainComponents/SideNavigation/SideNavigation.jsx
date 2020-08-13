import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../../components/SharedComponents/Loader/Loader";
import Icon from "../../components/SharedComponents/IcoMoon/IcoMoon";
import Button from "../../components/SharedComponents/Button/Button";
import modal from "../../components/SharedComponents/Modal/Modal";
import InitialsPlaceholder from "../../components/SharedComponents/InitialsPlaceholder/InitialsPlaceholder";

import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

import {
  fetchTopActiveExploreGroups_service,
  fetchTopActiveGroups_service,
} from "../../Services/fetch-services";
import { createGroup_service } from "../../Services/group-services";

import "./styles.scss";

const SideNavigation = () => {
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();

  const activeGroups = useSelector((state) => state.activeGroups);
  const activeExploreGroups = useSelector((state) => state.activeExploreGroups);

  const totalMyGroups = useSelector((state) => state.totalMyGroups);
  const totalDiscoverGroups = useSelector((state) => state.totalExploreGroups);

  const [isLoading, setLoading] = useState(false);
  const [cancelToken, setCancelToken] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [groupPrivacy, setGroupPrivacy] = useState("Public");
  const [validated, setValidated] = useState(false);

  async function fetchActiveGroups() {
    const response = await fetchTopActiveGroups_service();
    dispatch({
      type: "FETCH_ACTIVE_GROUPS",
      activeGroups: response.data.data,
      totalCount: response.data.totalGroupsCount,
    });
    return response.cancelToken;
  }

  async function fetchTopActiveExploreGroups() {
    const response = await fetchTopActiveExploreGroups_service();
    dispatch({
      type: "FETCH_ACTIVE_EXPLORE_GROUPS",
      activeExploreGroups: response.data.data,
      totalCount: response.data.totalGroupsCount,
    });
    return response.cancelToken;
  }
  useEffect(() => {
    fetchActiveGroups();
    fetchTopActiveExploreGroups();
  }, []);

  function handleShowModal(show) {
    setShowModal(show);
  }
  function returnCreateGroupForm() {
    return (
      <Form
        className="groups-create-group-form"
        noValidate
        validated={validated}
      >
        <Form.Group className="form-group">
          <Form.Label>Group Name</Form.Label>
          <Form.Control
            type="text"
            className="form-control group-name"
            placeholder="Enter a short name for your group"
            onChange={(e) => setGroupName(e.target.value)}
            value={groupName}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a group name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Group Description</Form.Label>
          <Form.Control
            as="textarea"
            onChange={(e) => setGroupDesc(e.target.value)}
            value={groupDesc}
            placeholder="What's the purpose of this group .."
          />
          <Form.Control.Feedback type="invalid">
            Please enter a group description.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Privacy</Form.Label>
          <Form.Check
            type="radio"
            label="Public"
            name="groupPrivacy"
            id="groupPrivacyO"
            value={"Public"}
            checked={groupPrivacy === "Public"}
            onChange={(e) => setGroupPrivacy(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Private"
            name="groupPrivacy"
            id="groupPrivacy1"
            value={"Private"}
            checked={groupPrivacy === "Private"}
            onChange={(e) => setGroupPrivacy(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Secret"
            name="groupPrivacy"
            id="groupPrivacy2"
            value={"Secret"}
            checked={groupPrivacy === "Secret"}
            onChange={(e) => setGroupPrivacy(e.target.value)}
          />
        </Form.Group>
      </Form>
    );
  }
  function createGroupCallback(data) {
    history.push(`/groups/${data.id}/discussion`);
  }
  async function createGroup(groupObj) {
    const response = await createGroup_service(groupObj);
    if (response) {
      toast("Group created!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "groups-toast",
        onClose: () => createGroupCallback(response.data),
      });
      fetchActiveGroups();
      handleShowModal(false);
    }
  }
  function handleCreateGroup() {
    var groupObj = {
      name: groupName,
      description: groupDesc,
      userid: loggedInUser.id,
      privacy: groupPrivacy,
    };
    if (!groupObj.name) {
      setValidated(true);
    } else {
      createGroup(groupObj);
    }
  }

  return (
    <div className="groups-sidenav-wrapper">
      <h5 className="groups-sidenav-wrapper__heading">Groups</h5>
      <Button
        onSubmitHandler={() => {
          setShowModal(true);
        }}
        text="Create New Group"
        className="primary"
        size="large"
      >
        <Icon
          icon="add--circle"
          disableFill="true"
          color="#fff"
          size="20"
          style={{ marginRight: "10px" }}
        />
      </Button>
      <div className="feeds-link">
        <Link to="/workzen-socialfeed">Feeds</Link>
      </div>

      <modal
        header="Create Group"
        shown={showModal}
        onClose={() => setShowModal(false)}
        centered={true}
        body={returnCreateGroupForm()}
        size={"lg"}
      >
        <Button
          className="primary"
          size="medium"
          text={"Create"}
          onSubmitHandler={() => handleCreateGroup()}
        />
        <Button
          onSubmitHandler={() => setShowModal(false)}
          className="primary-light"
          size="medium"
          text={"Cancel"}
        />
      </modal>
      <h5 className="groups-sidenav-wrapper__route-item ">Groups I'm In</h5>
      {isLoading ? (
        <div className="loader-placeholder">
          <Spinner />
        </div>
      ) : (
        <div className="groups-sidenav-wrapper__groups">
          {activeGroups.map((item, i) => {
            return (
              <div key={i} className="groups-sidenav-wrapper__groups__items">
                <div className="groupIcon">
                  <InitialsPlaceholder text={item.name} size={"sm"} />
                </div>
                <Link to={`/groups/${item.groupid}`} className="groupName">
                  {item.name}
                </Link>
              </div>
            );
          })}
          {totalMyGroups > 3 && (
            <div className="seemore-link">
              <Link to="/mygroups">See more </Link>
            </div>
          )}
        </div>
      )}

      <h5 className="groups-sidenav-wrapper__route-item ">Discover Groups</h5>
      {isLoading ? (
        <div className="loader-placeholder">
          <Spinner />
        </div>
      ) : (
        <div className="groups-sidenav-wrapper__explore">
          {activeExploreGroups.map((item, i) => {
            return (
              <div key={i} className="groups-sidenav-wrapper__groups__items">
                <div className="groupIcon">
                  <InitialsPlaceholder text={item.name} size={"sm"} />
                </div>
                <Link to={`/groups/${item.groupid}`} className="groupName">
                  {item.name}
                </Link>
              </div>
            );
          })}
          {totalDiscoverGroups > 3 && (
            <div className="seemore-link">
              <Link to="/discover">See more </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SideNavigation;

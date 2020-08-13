import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

import Feed from "../../components/Main/Feed/feed";
import Icon from "../../components/Shared/IcoMoon/IcoMoon";
import Button from "../../components/Shared/Button/Button";
import AppModal from "../../components/Shared/Modal/Modal";
import InitialsPlaceholder from "../../components/Shared/InitialsPlaceholder/InitialsPlaceholder";

import { createGroup_service } from "../../Services/group-services";
import { fetchRecentPosts_service } from "../../Services/fetch-services";

import "./styles.scss";

const GroupsActivityPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [skip, setSkip] = useState(0);
  const [key, setKey] = useState("feeds");
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [groupPrivacy, setGroupPrivacy] = useState("Public");
  const [showModal, setShowModal] = useState(false);

  const recentPostsData = useSelector((state) => state.recentPostsData);
  const activeGroups = useSelector((state) => state.activeGroups);
  const activeExploreGroups = useSelector((state) => state.activeExploreGroups);
  const totalMyGroups = useSelector((state) => state.totalMyGroups);
  const totalDiscoverGroups = useSelector((state) => state.totalExploreGroups);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const history = useHistory();

  async function fetchRecentPosts(cancelToken) {
    setLoading(true);
    const response = await fetchRecentPosts_service(pageNum, skip, cancelToken);
    if (response) {
      dispatch({
        type: "FETCH_POSTS",
        posts: response.data.data,
        feed: "RecentPosts",
      });
      if (response.data.paging.nextPage) {
        setNextPage(response.data.paging.nextPage);
      } else {
        setNextPage(null);
      }
      setLoading(false);
    }
  }
  function handleLoadMore() {
    setPageNum(nextPage);
    setSkip(recentPostsData.length);
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
      handleShowModal(false);
    }
  }
  function handleShowModal(show) {
    setShowModal(show);
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
  useEffect(() => {
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();

    fetchRecentPosts(source.token);

    return function () {
      source.cancel();
    };
  }, [pageNum]);

  return (
    <Container className="groups-activity-wrapper">
      {/*mobile tabs*/}
      <AppModal
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
      </AppModal>
      <Row className="groups-mobile w-100 d-md-none">
        <Col
          md={12}
          className="groups-mobile__header d-flex justify-content-between align-items-center"
        >
          <div className="title">Groups</div>
          <div className="create-group">
            <Icon
              icon="add--circle"
              disableFill="true"
              color="#1d3a57"
              size="25"
              onClick={() => setShowModal(true)}
            ></Icon>
          </div>
        </Col>

        <Col md={12} className="groups-mobile__tabs w-100">
          <Tabs
            defaultActiveKey="profile"
            id="mobile-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="feeds" title="Feeds">
              <div className="layout-main-content">
                <Feed
                  isGroup={false}
                  loadMore={handleLoadMore}
                  nextPage={nextPage ? true : false}
                  isLoading={isLoading}
                />
              </div>
            </Tab>
            <Tab eventKey="mygroups" title="Groups I'm in">
              {activeGroups.slice(0, 3).map((item, i) => {
                return (
                  <div
                    key={i}
                    className="groups-sidenav-wrapper__groups__items"
                  >
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
                <div className="d-flex justify-content-center">
                  <Button
                    className="primary"
                    text="See All"
                    onSubmitHandler={() => history.push("/mygroups")}
                  />
                </div>
              )}
            </Tab>
            <Tab eventKey="discover" title="Discover Groups">
              {activeExploreGroups.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="groups-sidenav-wrapper__groups__items"
                  >
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
                <div className="d-flex justify-content-center">
                  <Button
                    className="primary"
                    text="See All"
                    onSubmitHandler={() => history.push("/discover")}
                  />
                </div>
              )}
            </Tab>
          </Tabs>
        </Col>
      </Row>
      {/*End mobile tabs*/}
      <Row className="layout-feeds d-none d-md-block" noGutters="true">
        <Col md={12}>
          <div className="layout-main-content">
            <Feed
              isGroup={false}
              loadMore={handleLoadMore}
              nextPage={nextPage ? true : false}
              isLoading={isLoading}
            />
          </div>
        </Col>
        {/* <Col md={4}></Col> */}
      </Row>
    </Container>
  );
};
export default GroupsActivityPage;

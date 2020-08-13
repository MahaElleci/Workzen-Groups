import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../../Shared/Button/Button";
import Spinner from "../../Shared/Loader/Loader";

import { addPost_service } from "../../../Services/post-services";
import { fetchMyGroupData_service } from "../../../Services/fetch-services";

import "./styles.scss";

const CreatePost = ({ groupId, isGroup }) => {
  JavascriptTimeAgo.locale(en);
  const dispatch = useDispatch();
  const [myGroupsData, setMyGroupsData] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("0");
  const [postValue, setPostValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  async function fetchMyGroupsData(cancelToken) {
    const response = await fetchMyGroupData_service(1, 0, cancelToken);
    if (response) {
      setMyGroupsData([...myGroupsData, ...response.data.data]);
    }
  }
  useEffect(() => {
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();

    fetchMyGroupsData(source.token);

    return function () {
      source.cancel();
    };
  }, []);
  function handleAddPost() {
    if (!isGroup && selectedGroup === "0") {
      toast.error("Please select a group", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (postValue.trim() != "") {
      const group_id = isGroup ? groupId : selectedGroup;
      const postObj = {
        groupId: group_id,
        text: postValue,
        userId: loggedInUser.id,
      };
      addPost(group_id, postObj);
    }
  }
  async function addPost(groupId, postObj) {
    const response = await addPost_service(groupId, postObj);
    if (response.status === 200) {
      setLoading(true);
      let tempPostObj = response.data;
      tempPostObj["commentsListPaging"] = { data: [], paging: {} };
      setTimeout(() => {
        dispatch({
          type: "ADD_POST",
          newPost: tempPostObj,
          feed: isGroup ? "postsData" : "recentPostsData",
        });
        setLoading(false);
        toast("Post Added!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "groups-toast",
        });
      }, 1000);
      setPostValue("");
    }
  }
  return (
    <>
      <form className="groups-createPost">
        <textarea
          className="groups-createPost__textarea"
          placeholder="Share something"
          value={postValue}
          onChange={(event) => setPostValue(event.target.value)}
        />
        <img
          alt="userimage"
          className="userImage"
          src={
            loggedInUser.image
              ? loggedInUser.image
              : "https://www.globaleaks.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
          }
        />
        {!isGroup && (
          <Form.Group
            as={Row}
            className="group-select"
            controlId="selectedGroup"
          >
            <Form.Label column sm={2}>
              Post in
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                onChange={(event) => setSelectedGroup(event.target.value)}
                value={selectedGroup}
              >
                <option disabled className="select-placeholder" value="0">
                  Select from your groups
                </option>
                {myGroupsData.length > 0 &&
                  myGroupsData.map((group, i) => {
                    return (
                      <option key={i} value={group.groupid}>
                        {group.name}
                      </option>
                    );
                  })}
              </Form.Control>
            </Col>
          </Form.Group>
        )}
        <Button
          size="small"
          className={"primary"}
          onSubmitHandler={handleAddPost}
          text={"Post"}
        ></Button>
      </form>
      {isLoading && (
        <div className="groups-spinner-placeholder">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default CreatePost;

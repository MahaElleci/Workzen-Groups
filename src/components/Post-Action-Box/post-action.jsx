import React, { useState, useEffect } from "react";
import axios from "axios";
import JavascriptTimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import Button from "../Shared/Button/Button";
import Spinner from "../Shared/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import en from "javascript-time-ago/locale/en";
import "./styles.scss";

const CreatePost = () => {
  JavascriptTimeAgo.locale(en);
  const dispatch = useDispatch();
  const [postValue, setPostValue] = useState("Share something");
  const [isLoading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    image:
      "https://www.globaleaks.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
  });
  const data = useSelector(state => state.data);
  useEffect(() => {
    setLoggedInUser(data.loggedInUser);
  }, []);

  function addNewPost() {
    var randomId = Math.floor(Math.random() * 101) + "";
    const postObj = {
      id: randomId,
      groupId: "6da577be-af6a-4fe3-82eb-4fd448100428",
      text: postValue,
      owner: loggedInUser,
      seenList: [],
      commentList: [],
      createDate: new Date().toDateString()
    };
    axios
      .post(
        "https://10.10.32.157/WorkzenGroup/api/Posts/6da577be-af6a-4fe3-82eb-4fd448100428",
        postObj
      )
      .then(function(response) {
        setLoading(true);
        setTimeout(() => {
          dispatch({ type: "ADD_POST", newPost: response.data });
          setLoading(false);
        }, 3000);
        setPostValue("Share something");
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function clearInput() {
    if (postValue === "Share something") setPostValue("");
  }
  function addPlaceholder() {
    if (postValue === "") setPostValue("Share something");
  }
  return (
    <React.Fragment>
      <form className="createPost">
        <textarea
          className="createPost__textarea"
          onClick={() => clearInput()}
          value={postValue}
          onChange={event => setPostValue(event.target.value)}
          onBlur={() => addPlaceholder()}
        />
        <img alt="userimage" className="userImage" src={loggedInUser.image} />
        <Button onSubmitHandler={addNewPost} text={"Post"}></Button>
      </form>
      {isLoading && (
        <div className="spinner-placeholder">
          <Spinner />
        </div>
      )}
    </React.Fragment>
  );
};

export default CreatePost;

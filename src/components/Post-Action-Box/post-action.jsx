import React, { useState, useEffect } from "react";
import Button from "../Shared/Button/Button";
import Spinner from "../Shared/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import './styles.scss';

const CreatePost = () => {
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
  function handleSubmit() {
    const postObj = {
      id: 847,
      content: postValue,
      userInfo: loggedInUser, 
      seenby: 0,
      commentsCount: 0
    };  
    setLoading(true)
    setTimeout(()=>{
      dispatch({ type: "ADD_POST", newPost: postObj }); 
      setLoading(false)
    },3000) 
    setPostValue("Share something");
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
        <img className="userImage" src={loggedInUser.image} />
        <Button onSubmitHandler={handleSubmit} text={"Post"}></Button>
      </form>
      {isLoading && <div className="spinner-placeholder"><Spinner /></div>}
    </React.Fragment>
  );
};

export default CreatePost;

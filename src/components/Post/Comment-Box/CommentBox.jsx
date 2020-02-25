import React, { useState } from "react"; 
import JavascriptTimeAgo from 'javascript-time-ago' 
import ReactTimeAgo from 'react-time-ago'
import Button from "../../Shared/Button/Button";
import { useDispatch } from "react-redux"; 
import en from 'javascript-time-ago/locale/en';
import "./styles.scss";
const CommentBox = ({ user, postID }) => { 
  JavascriptTimeAgo.locale(en)
  const dispatch = useDispatch();
  const [commentValue, setCommentValue] = useState("Write something");

  function handleSubmit() {
    const commentObj = {
      id: 847,
      content: commentValue,
      userInfo: user,
      timeCreated: <ReactTimeAgo date={new Date()}/>
    };

    dispatch({ type: "ADD_COMMENT", newComment: commentObj, postId: postID });
    setCommentValue("Write something");
  }
  function clearInput() {
    if (commentValue === "Write something") setCommentValue("");
  }
  function addPlaceholder() {
    if (commentValue === "") setCommentValue("Write something");
  }
  return (
    <div className="comment-action">
      <div className="post-card__comment-box">
        <input
          type="text"
          value={commentValue}
          onBlur={() => addPlaceholder()}
          onClick={() => clearInput()}
          onChange={event => setCommentValue(event.target.value)}
        ></input>
      </div>
      <Button onSubmitHandler={handleSubmit} text={"Post"} />
    </div>
  );
};
export default CommentBox;

import React from "react";
import Post from "../Post/post";
import "./styles.scss";

const Feed = ({ data }) => {
  return (
    <div className="container">
      <div className="feed-wrapper">
        {data.map(item => {
          return <Post data={item} />;
        })}
      </div>
    </div>
  );
};
export default Feed;

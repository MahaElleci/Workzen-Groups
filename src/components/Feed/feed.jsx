import React from "react";
import Post from "../Post/post"; 
import PostBox from "../Post-Action-Box/post-action";
import "./styles.scss";

const Feed = ({ data }) => {
  return (
    <div className="container">
      <div className="feed-wrapper"> 
      <PostBox data={data}/>
        {data.postsData.map(item => {
          return <Post data={item} />;
        })}
      </div>
    </div>
  );
};
export default Feed;

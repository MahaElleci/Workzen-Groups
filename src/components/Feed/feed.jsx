import React from "react";
import Post from "../Post/post"; 
import PostBox from "../Post-Action-Box/post-action"; 
import {useSelector} from 'react-redux';
import "./styles.scss";

const Feed = () => { 
  const postsData = useSelector(state => state.postsData);   
  const data = useSelector(state => state.data)
  return (
    <div className="container">
      <div className="feed-wrapper"> 
      <PostBox data={data} />
        {postsData.map((item,i) => {
          return <Post key={i}data={item} />;
        })}
      </div>
    </div>
  );
};
export default Feed;

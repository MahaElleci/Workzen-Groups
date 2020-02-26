import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../Post/post";
import PostBox from "../Post-Action-Box/post-action";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";

const Feed = () => {
  const postsData = useSelector(state => state.postsData);
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();

  function fetchPostsData() {
    axios(
      "https://10.10.32.157/WorkzenGroup/api/Posts/6da577be-af6a-4fe3-82eb-4fd448100428"
    )
      .then(response => { 
        dispatch({type:"FETCH_POSTS", posts: response.data}) 
      })
      .catch(e => {
        return e;
      }); 
    
  }

  useEffect(() => {
    fetchPostsData();  
  }, []); 

  return (
    <div className="container">
      <div className="feed-wrapper">
        <PostBox data={data} />
        {postsData.map((item) => {
          return <Post key={item.id} data={item} loggedInUser={data.loggedInUser} />;
        })}
      </div>
    </div>
  );
};
export default Feed;

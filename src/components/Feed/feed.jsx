import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../Post/post";
import PostBox from "../Post-Action-Box/post-action";
import Spinner from "../Shared/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";

const Feed = () => {
  const [isLoading, setLoading] = useState(false);
  const postsData = useSelector(state => state.postsData);
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();

  function fetchPostsData() {
    setLoading(true);
    axios
      .get(
        "https://10.10.32.157/WorkzenGroup/api/Posts/6da577be-af6a-4fe3-82eb-4fd448100428"
      )
      .then(response => { 
        setTimeout(()=>{
          dispatch({ type: "FETCH_POSTS", posts: response.data }); 
          setLoading(false);
        },3000)
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
        {postsData.length > 0 &&
          postsData.map(item => {
            return (
              <Post
                key={item.id}
                data={item}
                loggedInUser={data.loggedInUser}
              />
            );
          })}
        {isLoading && (
          <div className="spinner-placeholder">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
export default Feed;

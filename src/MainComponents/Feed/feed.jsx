import React from "react";
import { useSelector } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";

import Post from "../Post/post";
import Button from "../../SharedComponents/Button/Button";
import PostBox from "../Post-Action-Box/post-action";
import EmptyState from "../../SharedComponents/EmptyState/EmptyState";
import Spinner from "../../SharedComponents/Loader/Loader";

import "./styles.scss";

const Feed = ({
  isGroup,
  groupId,
  loadMore,
  nextPage,
  isLoading,
  isMember,
}) => {
  const postsData = useSelector((state) => state.postsData);
  const recentPostsData = useSelector((state) => state.recentPostsData);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  function renderPosts() {
    return isGroup ? postsData : recentPostsData;
  }
  return (
    <div className="groups-feed-wrapper">
      {isMember && isGroup && <PostBox isGroup={isGroup} groupId={groupId} />}
      {!isGroup && <PostBox isGroup={isGroup} groupId={groupId} />}
      {renderPosts().length > 0
        ? renderPosts().map((item, i) => {
            return (
              <VisibilitySensor
                delayedCall={true}
                partialVisibility={true}
                offset={{ bottom: 250 }}
                key={i}
              >
                {({ isVisible }) => {
                  return (
                    <Post
                      key={item.id}
                      data={item}
                      isMember={isMember}
                      isGroup={isGroup}
                      loggedInUser={loggedInUser}
                      isVisible={isVisible}
                    />
                  );
                }}
              </VisibilitySensor>
            );
          })
        : !isLoading && (
            <EmptyState
              color={"#858EA2"}
              icon={"exclamation"}
              message={"No Posts Yet!"}
              size={40}
            />
          )}
      <div className="loadMore-button">
        {nextPage && !isLoading && (
          <Button
            className={"primary"}
            onSubmitHandler={loadMore}
            text={"Load More"}
            size="large"
          />
        )}
      </div>
      {isLoading && (
        <div className="spinner-placeholder">
          <Spinner />
        </div>
      )}
    </div>
  );
};
export default Feed;

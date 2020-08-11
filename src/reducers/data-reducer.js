import update from "immutability-helper";

const initialState = {
  selectedGroupData: {},
  loggedInUserIsAdmin: false,
  loggedInUser: {
    // id: "57b221d7-eb5d-43b9-83e6-352bc8f4b906",
    // displayName: "Default User",
    // jobTitle: "Manager",
    // image: "https://www.globaleaks.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
  },
  users: [],
  myGroupsData: [],
  activeGroups: [],
  activeExploreGroups: [],
  totalExploreGroups: 0,
  totalMyGroups: 0,
  postsData: [],
  recentPostsData: [],
  selectedMembers: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LOGGED_IN_USER": {
      return {
        ...state,
        loggedInUser: action.userObj,
      };
    }
    case "SET_IS_ADMIN": {
      return {
        ...state,
        loggedInUserIsAdmin: action.admin,
      };
    }
    case "FETCH_USERS": {
      return {
        ...state,
        users: [...action.users],
      };
    }
    // Handling data
    case "FETCH_POSTS": {
      if (action.feed === "GroupFeed") {
        return update(state, {
          postsData: { $push: action.posts },
          recentPostsData: [],
        });
      }
      if (action.feed === "RecentPosts") {
        return {
          ...state,
          recentPostsData: [...state.recentPostsData, ...action.posts],
          postsData: [],
        };
      }
    }
    case "CREATE_GROUP": {
      return {
        ...state,
        myGroupsData: [action.newGroup, ...state.myGroupsData],
      };
    }
    case "FETCH_GROUPS_DATA": {
      return {
        ...state,
        selectedGroupData: action.selectedGroupData,
      };
    }
    case "FETCH_ACTIVE_GROUPS": {
      return {
        ...state,
        activeGroups: action.activeGroups,
        totalMyGroups: action.totalCount,
      };
    }
    case "FETCH_ACTIVE_EXPLORE_GROUPS": {
      return {
        ...state,
        activeExploreGroups: action.activeExploreGroups,
        totalExploreGroups: action.totalCount,
      };
    }
    case "SELECT_MEMBERS": {
      return {
        ...state,
        selectedMembers: action.members,
      };
    }
    case "LEAVE_GROUP": {
      return {
        ...state,
        myGroupsData: state.myGroupsData.filter(
          (group) => group.groupid !== action.groupid
        ),
      };
    }
    case "ADD_POST": {
      return {
        ...state,
        [action.feed]: [action.newPost, ...state[action.feed]],
      };
    }

    case "DELETE_POST": {
      return {
        ...state,
        [action.feed]: state[action.feed].filter(
          (item) => item.id !== action.id
        ),
      };
    }

    case "EDIT_POST": {
      let postIndex = state[action.feed].findIndex(
        (post) => post.id === action.id
      );
      return update(state, {
        [action.feed]: {
          [postIndex]: {
            text: {
              $set: action.text,
            },
          },
        },
      });
    }

    case "SEEN_POST": {
      let postIndex = state[action.feed].findIndex(
        (post) => post.id === action.postId
      );
      return update(state, {
        [action.feed]: {
          [postIndex]: {
            isSeen: {
              $set: true,
            },
            seenCount: {
              $set: ++action.seenCount,
            },
          },
        },
      });
    }

    case "ADD_COMMENT": {
      let postIndex = state[action.feed].findIndex(
        (post) => post.id === action.postId
      );
      return update(state, {
        [action.feed]: {
          [postIndex]: {
            commentsListPaging: {
              data: {
                $unshift: [action.newComment],
              },
            },
            commentCount: {
              $set: ++action.commentCount,
            },
          },
        },
      });
    }

    case "LOAD_MORE_COMMENTS": {
      let postIndex = state[action.feed].findIndex(
        (post) => post.id === action.postId
      );
      return update(state, {
        [action.feed]: {
          [postIndex]: {
            commentsListPaging: {
              data: {
                $push: [...action.newComments],
              },
            },
          },
        },
      });
    }

    case "DELETE_COMMENT": {
      let postIndex = state[action.feed].findIndex(
        (post) => post.id === action.postId
      );
      let commentIndex = state[action.feed][
        postIndex
      ].commentsListPaging.data.findIndex(
        (comment) => comment.id === action.commentId
      );
      return update(state, {
        [action.feed]: {
          [postIndex]: {
            commentsListPaging: {
              data: {
                $splice: [[commentIndex, 1]],
              },
            },
            commentCount: {
              $set: --action.commentCount,
            },
          },
        },
      });
    }

    case "EDIT_COMMENT": {
      let postIndex = state[action.feed].findIndex(
        (post) => post.id === action.postId
      );
      let commentIndex = state[action.feed][
        postIndex
      ].commentsListPaging.data.findIndex(
        (comment) => comment.id === action.commentId
      );
      return update(state, {
        [action.feed]: {
          [postIndex]: {
            commentsListPaging: {
              data: {
                [commentIndex]: {
                  commentText: {
                    $set: action.commentText,
                  },
                },
              },
            },
          },
        },
      });
    }

    case "LIKE_POST": {
      if (action.feed === "GroupFeed") {
        let postIndex = state.postsData.findIndex(
          (post) => post.id === action.postId
        );
        return update(state, {
          postsData: {
            [postIndex]: {
              likeCount: {
                $set: ++action.likeCount,
              },
            },
          },
        });
      }
      if (action.feed === "RecentPosts") {
        let postIndex = state.recentPostsData.findIndex(
          (post) => post.id === action.postId
        );
        return update(state, {
          recentPostsData: {
            [postIndex]: {
              likeCount: {
                $set: ++action.likeCount,
              },
            },
          },
        });
      }
    }

    case "DISLIKE_POST": {
      let postIndex = state[action.feed].findIndex(
        (post) => post.id === action.postId
      );
      return update(state, {
        [action.feed]: {
          [postIndex]: {
            likeCount: {
              $set: --action.likeCount,
            },
          },
        },
      });
    }

    default:
      return state;
  }
}

export default rootReducer;

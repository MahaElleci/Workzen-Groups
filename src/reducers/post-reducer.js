import update from "immutability-helper";

const postState = {
  postsData: [],
  recentPostsData: [],
};

const post = (state = postState, action) => {
  switch (action.type) {
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
      let postIndex = state.postsData.findIndex(
        (post) => post.id === action.postId
      );
      return update(state, {
        [action.feed]: {
          [postIndex]: {
            likeCount: {
              $set: ++action.likeCount,
            },
          },
        },
      });
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
};

export default post;

const userState = {
  loggedInUserIsAdmin: false,
  loggedInUser: {
    id: "d4ee0ba7-e8bd-4577-8363-f0095d3288ca",
    displayName: "Omar El-Sakka",
    jobTitle: "VP",
    image:
      "https://www.globaleaks.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
  },
};

const user = (state = userState, action) => {
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
    default:
      return state;
  }
};

export default user;

const initialState = {
  data: {
    loggedInUser: {
      id: 655,
      name: "Steve Harris",
      image:
        "https://1ofdmq2n8tc36m6i46scovo2e-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg"
    },
    groupsData: {
      userGroups: [
        {
          name: "User Experience",
          icon: "fa fa-lightbulb-o"
        },
        {
          name: "North America",
          icon: "fa fa-users"
        },
        {
          name: "Communication",
          icon: "fa fa-bullseye"
        }
      ],
      exploreGroups: [
        {
          name: "User Experience",
          icon: "fa fa-lightbulb-o"
        },
        {
          name: "North America",
          icon: "fa fa-users"
        }
      ]
    },
  }, 
  postsData: [
    {
      id: 0,
      content:
        "This approach allows the component that composes the input to have strict control over the state of the input, while still allowing updates to the DOM to provide information about the text that the user has written.",
      userInfo: {
        id: 0,
        name: "Ahmed Hamed",
        image:
          "https://mk0abtastybwtpirqi5t.kinstacdn.com/wp-content/uploads/anthony-brebion.jpg"
      }
    },
    {
      id: 0,
      content:
        "This approach allows the component that composes the input to have strict control over the state of the input, while still allowing updates to the DOM to provide information about the text that the user has written.",
      userInfo: {
        id: 0,
        name: "Ahmed Hamed",
        image:
          "https://mk0abtastybwtpirqi5t.kinstacdn.com/wp-content/uploads/anthony-brebion.jpg"
      }
    },
    {
      id: 0,
      content:
        "This approach allows the component that composes the input to have strict control over the state of the input, while still allowing updates to the DOM to provide information about the text that the user has written.",
      userInfo: {
        id: 0,
        name: "Ahmed Hamed",
        image:
          "https://mk0abtastybwtpirqi5t.kinstacdn.com/wp-content/uploads/anthony-brebion.jpg"
      }
    }
  ]
};

function rootReducer(state = initialState, action) {  
  switch (action.type) { 
    case "ADD_POST":
      return { ...state, postsData: [action.newPost, ...state.postsData]}
    default:
      return state;
  }
}
 
export default rootReducer;
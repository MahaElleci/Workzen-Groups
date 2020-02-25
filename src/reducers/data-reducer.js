const initialState = {
  data: {
    loggedInUser: {
      id: 655,
      name: "Amanda Mayers",
      image:
        "https://www.telegraph.co.uk/content/dam/women/2017/03/10/vanessa_trans%2B%2BLoiKUtRP1b2XRX1bmrGgXxe6ykgCMwF95Mjos1GdaiQ.jpg"
    },
    groupsData: {
      userGroups: [
        {
          name: "User Experience",
          icon: "lamp"
        },
        {
          name: "North America",
          icon: "group"
        },
        {
          name: "Communication",
          icon: "dart"
        }
      ],
      exploreGroups: [
        {
          name: "User Experience",
          icon: "lamp"
        },
        {
          name: "North America",
          icon: "dart"
        }
      ]
    },
  }, 
  postsData: [
    {
      id: 0,
      content:
        "his classification provides a dichotomy between employment for pay (groups G and D) and employment for profit (groups F, C and E)",
      userInfo: {
        id: 0,
        name: "Kevin Wales",
        image:
          "https://mk0abtastybwtpirqi5t.kinstacdn.com/wp-content/uploads/anthony-brebion.jpg"
      }, 
      seenby: 10,
      commentsCount: 0
    },
    {
      id: 0,
      content:
        "Meanwhile, the International Classification of Status at Work (ICSaW-18) provides an organizing framework for statistics classified by status at work. It covers all jobs and work activities in all forms of work, including own-use production work, employment, unpaid trainee work, volunteer work and other forms of work. At its most detailed level, it comprises 20 mutually exclusive categories. The detailed status at work categories may be aggregated, based on the type of authority exercised by the worker, to form eight broad groups, which may be further aggregated to form a dichotomy between independent workers and dependent workers.",
      userInfo: {
        id: 0,
        name: "Mathew James",
        image:
          "https://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg"
      }, 
      seenby: 25,
      commentsCount: 0
    },
    {
      id: 0,
      content:
        "A person's employment status defines what rights and responsibilities they have at work.",
      userInfo: {
        id: 0,
        name: "Kevin Harris",
        image:
          "https://1ofdmq2n8tc36m6i46scovo2e-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg"
      }, 
      seenby: 33,
      commentsCount: 0
    }
  ], 
  workmates: [
    {
      id: 0,
      heading: "Kevin Harris", 
      image: "https://1ofdmq2n8tc36m6i46scovo2e-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg", 
      subtitle: "Senior Project Manager"
    }, 
    {
      id: 0,
      heading: "Mathew James", 
      image: "https://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg", 
      subtitle: "Lead Software Engineer"
    }, 
    {
      id: 0,
      heading: "Kevin Wales", 
      image: "https://mk0abtastybwtpirqi5t.kinstacdn.com/wp-content/uploads/anthony-brebion.jpg", 
      subtitle: "Principle Software Engineer"
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
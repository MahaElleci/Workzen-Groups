const groupState = {
  selectedGroupData: {},
  myGroupsData: [],
  activeGroups: [],
  activeExploreGroups: [],
  totalExploreGroups: 0,
  totalMyGroups: 0,
  selectedMembers: [],
};

const group = (state = groupState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default group;

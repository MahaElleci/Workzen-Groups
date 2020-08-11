import dataRequester from '../Requesters/dataRequester'; 

export const deleteGroup_service = async function(groupId){
  return await dataRequester({
      method: "delete",
      url: `/Groups/${groupId}`
  });
}  
export const editGroup_service = async function(groupId, groupObj){
  return await dataRequester({
      method: "put",
      url: `/groups/${groupId}`, 
      data: groupObj
  });
}  

export const addAdmin_service = async function(groupId,userid){
  return await dataRequester({
      method: "put",
      url: `/Groups/SetMemberAsAdmin/${groupId}?userid=${userid}`
  });
}  
 
export const removeAdmin_service = async function(groupId,userid){
  return await dataRequester({
      method: "put",
      url: `/Groups/SetAdminAsMember/${groupId}?userid=${userid}`
  });
} 
export const removeMember_service = async function(groupId,userid){
  return await dataRequester({
      method: "put",
      url: `/Groups/RemoveMember/${groupId}?userid=${userid}`
  });
} 
export const approveRequests_service = async function(groupId, requests){ 
    return await dataRequester({
        method: "PUT",
        url: `/Groups/ApproveJoinRequestForUsersList/${groupId}`,
        data: requests
      });
};  
export const rejectRequests_service = async function(groupId, requests){ 
    return await dataRequester({
        method: "PUT",
        url:  `/Groups/DeclineJoinRequestForUsersList/${groupId}`,
        data: requests
      });
};  
  



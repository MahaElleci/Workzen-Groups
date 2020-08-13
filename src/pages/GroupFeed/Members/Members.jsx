import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

import MemberCard from "./MemberCard/MemberCard";
import HeaderBar from "../../../components/SharedComponents/HeaderBar/HeaderBar";
import EmptyState from "../../../components/SharedComponents/EmptyState/EmptyState";
import Dropdown from "../../../components/SharedComponents/Dropdown/Dropdown";
import Spinner from "../../../components/SharedComponents/Loader/Loader";
import Button from "../../../components/SharedComponents/Button/Button";
import modal from "../../../components/SharedComponents/Modal/Modal";
import SearchBar from "../../../components/SharedComponents/SearchBar/SearchBar";
import Icon from "../../../components/SharedComponents/IcoMoon/IcoMoon";

import { addMembers_service } from "../../../Services/group-services";
import {
  addAdmin_service,
  removeAdmin_service,
  removeMember_service,
} from "../../../Services/groupAdmin-services";
import { getUsers_service } from "../../../Services/sitecore-services";

import "./styles.scss";

const MembersListing = () => {
  let users = [];
  const groupData = useSelector((state) => state.selectedGroupData);
  const dispatch = useDispatch();
  const selectedMembers = useSelector((state) => state.selectedMembers);
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const [emptyMessage, setEmptyMessage] = useState(
    "This group currently has no members"
  );
  const [initMemberList, setInitMemberList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(1);
  const [membersInfo, setMembersInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  async function fetchMembersInfo(cancelToken) {
    setIsLoading(true);
    const membersData = groupData.memberListPaging
      ? groupData.memberListPaging.data
      : [];
    const response = await getUsers_service(membersData, cancelToken);
    setMembersInfo(response.data);
    setInitMemberList(response.data);
    setIsLoading(false);
  }
  useEffect(() => {
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();

    fetchMembersInfo(source.token);

    if (groupData.memberListPaging) {
      setMemberCount(groupData.memberListPaging.data.length);
      let admins = groupData.memberListPaging.data.filter(
        (item) => item.isAdmin === true
      );
      let isAdminBool = admins.some(
        (admin) => admin.userId === loggedInUser.id
      );
      setIsAdmin(isAdminBool);
      setAdminCount(admins.length);
    }

    return function () {
      source.cancel();
    };
  }, [groupData.memberListPaging]);
  const tabs = [
    { id: 1, text: "Members" },
    { id: 2, text: "Admins" },
  ];
  function selectTabHandler(id) {
    setSelectedTab(id);
  }
  async function addAdmin(user) {
    const response = await addAdmin_service(groupData.id, user.id);
    if (response) {
      dispatch({
        type: "FETCH_GROUPS_DATA",
        selectedGroupData: response.data,
      });
      toast("This member is now an admin of the group.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "groups-toast",
      });
    }
  }
  async function removeAdmin(user) {
    const response = await removeAdmin_service(groupData.id, user.id);
    if (response) {
      dispatch({
        type: "FETCH_GROUPS_DATA",
        selectedGroupData: response.data,
      });
      toast("This member is no longer an admin of the group.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "groups-toast",
      });
    }
  }

  async function removeMember(user) {
    const response = await removeMember_service(groupData.id, user.id);
    if (response) {
      dispatch({ type: "FETCH_GROUPS_DATA", selectedGroupData: response.data });
      toast("This member is now removed from the group.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "groups-toast",
      });
    }
  }
  function toggleAdmin(user) {
    let admins = groupData.memberListPaging.data.filter(
      (item) => item.isAdmin === true
    );
    let isAdminBool = admins.some((admin) => admin.userId === user.id);
    isAdminBool ? removeAdmin(user) : addAdmin(user);
  }

  function returnMembersAction(user) {
    let admins = groupData.memberListPaging.data.filter(
      (item) => item.isAdmin === true
    );
    let isAdminBool = admins.some((admin) => admin.userId === user.id);
    const membersActions = [
      {
        title: "Remove Member",
        icon: "close",
        onClick: () => removeMember(user),
      },
      {
        title: isAdminBool ? "Remove Admin" : "Make Admin",
        icon: "admin",
        onClick: () => toggleAdmin(user),
      },
    ];
    return (
      <div className="members-actions">
        <Dropdown items={membersActions} />
      </div>
    );
  }

  function returnMembers() {
    return (
      membersInfo.length > 0 &&
      membersInfo.map((item, i) => {
        return (
          <MemberCard
            key={i}
            userData={item}
            groupData={groupData}
            membersActions={returnMembersAction}
          />
        );
      })
    );
  }
  function returnAdmins() {
    const membersData = groupData.memberListPaging
      ? groupData.memberListPaging.data
      : [];
    const adminIds = membersData.filter((item) => item.isAdmin === true);
    let adminsInfo = [];
    membersInfo.length > 0 &&
      membersInfo.map((item) => {
        adminIds.map((admin) => {
          if (admin.userId === item.id) {
            adminsInfo.push(item);
          }
        });
      });
    return adminsInfo.map((item) => {
      return <MemberCard key={item.id} userData={item} groupData={groupData} />;
    });
  }
  async function addSelectedMembers() {
    const response = await addMembers_service(groupData.id, selectedMembers);
    if (response.status == 200) {
      setShowModal(false);
      toast("Members added to the group.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "groups-toast",
        autoClose: 1000,
        onClose: () =>
          dispatch({
            type: "FETCH_GROUPS_DATA",
            selectedGroupData: response.data,
          }),
      });
    } else {
      toast.error("Error occurred.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: false,
      });
    }
  }

  function filterMembers(query) {
    if (query.length > 0) {
      users = initMemberList.filter(function (user) {
        return user.displayName.toLowerCase().indexOf(query) != -1;
      });
      if (users && users.length > 0) {
        setMembersInfo(users);
        setMemberCount(users.length);
      } else {
        setEmptyMessage("No users found.");
        setMembersInfo([]);
        setMemberCount(0);
      }
    } else {
      setMembersInfo(initMemberList);
      setMemberCount(initMemberList.length);
    }
  }
  return (
    <>
      <div className="groups-settings-wrapper">
        <HeaderBar
          title="Members"
          tabs={tabs}
          selectTab={selectTabHandler}
          selectedTab={selectedTab}
        >
          {isAdmin ? (
            <button
              className="header-add-member"
              onClick={() => setShowModal(true)}
            >
              <Icon icon={"plus"} /> Add member
            </button>
          ) : null}
        </HeaderBar>
      </div>
      <modal
        header={"Add Member"}
        body={<SearchBar />}
        shown={showModal}
        size={"md"}
        onClose={() => setShowModal(false)}
        centered={true}
      >
        <Button
          className="primary"
          size={"medium"}
          text={"Add"}
          disabled={selectedMembers.length < 1}
          onSubmitHandler={() => addSelectedMembers()}
        />
        <Button
          className="primary-light"
          size={"medium"}
          text={"Cancel"}
          onSubmitHandler={() => setShowModal(false)}
        />
      </modal>
      <div className="membersListing-filter-bar">
        <div className="membersListing-filter-bar__results d-none d-md-block">
          Showing
          {selectedTab === 1
            ? " (" + memberCount + ") Members"
            : " (" + adminCount + ") Admins"}
        </div>
        <div className="membersListing-filter-bar__search">
          <InputGroup>
            <FormControl
              placeholder="Search Members"
              aria-label="Search Members"
              aria-describedby="Search Members"
              onChange={(e) => filterMembers(e.target.value.toLowerCase())}
            />
            <InputGroup.Append className="icon">
              <Icon icon="search" />
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
      <div className="membersListing-wrapper flex-md-row">
        {isLoading && <Spinner />}
        {!isLoading && membersInfo && membersInfo.length === 0 && (
          <EmptyState message={emptyMessage} />
        )}
        <div className="admins-mobile d-md-none">
          <p>Admins</p>
          {!isLoading && membersInfo && returnAdmins()}
        </div>
        <div className="members-mobile d-md-none">
          <p>Members</p>
          {isAdmin ? (
            <Icon
              icon="add--circle"
              disableFill="true"
              color="#1d3a57"
              size="20"
              onClick={() => setShowModal(true)}
            />
          ) : null}
        </div>
        {selectedTab === 1 && !isLoading && membersInfo && returnMembers()}
        {selectedTab === 2 && !isLoading && membersInfo && returnAdmins()}
      </div>
    </>
  );
};

export default MembersListing;

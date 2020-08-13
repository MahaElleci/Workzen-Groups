import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";

import InitialsPlaceholder from "../../../components/Shared/InitialsPlaceholder/InitialsPlaceholder";
import Icon from "../../../components/Shared/IcoMoon/IcoMoon";

import {
  joinPublicGroup_service,
  joinPrivateGroup_service,
  leaveGroup_service,
  cancelRequest_service,
} from "../../../Services/group-services";

import { fetchGroupData_service } from "../../../Services/fetch-services";

import "./styles.scss";

const GroupCard = ({ data, isMember }) => {
  const dispatch = useDispatch();
  const [adminList, setAdminList] = useState(null);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const btnState = data.isJoinRequested ? "Requested" : "Join";
  const iconState = data.isJoinRequested ? "" : "plus";
  const [buttonText, setButtonText] = useState(btnState);
  const [buttonIcon, setButtonIcon] = useState(iconState);
  const [showActions, setShowActions] = useState(false);
  const [action, setAction] = useState();

  const actions = {
    leave: {
      title: "Leave Group",
      icon: "leave",
      func: () => handleLeaveGroup(),
    },
    cancel: {
      title: "Cancel Request",
      icon: "close",
      func: () => cancelRequest(),
    },
  };
  const innerRef = useCallback((node) => {
    if (node !== null) {
      node.focus();
    }
  }, []);
  async function getGroupData(cancelToken) {
    const response = await fetchGroupData_service(data.groupid, cancelToken);
    if (response) {
      let adminListTemp = response.data.memberListPaging.data
        ? response.data.memberListPaging.data.filter(
            (member) => member.isAdmin === true
          )
        : [];
      setAdminList(adminListTemp);
    }
  }
  useEffect(() => {
    let cancelToken = axios.CancelToken;
    let source = cancelToken.source();

    getGroupData(source.token);

    return function () {
      source.cancel();
    };
  }, []);

  async function joinGroup() {
    if (buttonText === "Requested") {
      setAction(actions.cancel);
      setShowActions(true);
    } else if (buttonText === "Joined") {
      setAction(actions.leave);
      setShowActions(true);
    } else {
      const response =
        data.privacy === "Private"
          ? await joinPrivateGroup_service(data.groupid)
          : await joinPublicGroup_service(data.groupid);
      if (response) {
        if (data.privacy === "Private") {
          setButtonText("Requested");
        } else {
          setButtonText("Joined");
          toast("You're now a member of this group!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: "groups-toast",
          });
        }
        setButtonIcon("");
      }
    }
  }
  // Set the Btn initial state ( Join state)
  function setBtnInitialState() {
    setShowActions(false);
    setButtonIcon("plus");
    setButtonText("Join");
  }

  // Handling Leave group
  function handleLeaveGroup() {
    const isAdmin = adminList.some((admin) => admin.id === loggedInUser.id);
    if (adminList.length < 2 && isAdmin) {
      toast.error(
        "You are the only admin, please select another admin before leaving the group.",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    } else {
      leaveGroup();
    }
  }

  // Leave group
  async function leaveGroup() {
    const response = await leaveGroup_service(data.groupid);
    if (response) {
      setBtnInitialState();
      dispatch({
        type: "LEAVE_GROUP",
        groupid: data.groupid,
      });
    }
  }

  // Cancel request for joining private groups
  async function cancelRequest() {
    const response = await cancelRequest_service(data.groupid);
    if (response) {
      setBtnInitialState();
    }
  }
  // Hide the dropdown on blur
  function onBlurEvent(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowActions(false);
    }
  }
  return (
    <div className="groupCard-wrapper">
      <div className="logo">
        <InitialsPlaceholder text={data.name} size={"lg"} />
      </div>

      <div className="groupCard-wrapper__text">
        <Link to={`/groups/${data.groupid}`} className="title">
          {data.name}
        </Link>
        <p className="privacy">{data.privacy}</p>
      </div>
      {showActions && (
        <div
          className="groupCard-wrapper__actions-wrap"
          tabIndex={0}
          ref={innerRef}
          onBlur={(e) => onBlurEvent(e)}
        >
          <button onClick={action.func}>
            <Icon style={{ marginRight: "8px" }} size={14} icon={action.icon} />
            {action.title}
          </button>
        </div>
      )}
      {!isMember ? (
        <button
          className="groupCard-wrapper__join-btn"
          onClick={() => joinGroup()}
        >
          <Icon
            style={{ marginRight: "4px" }}
            color="#1d3a57"
            size={12}
            icon={buttonIcon}
          />{" "}
          {buttonText}
        </button>
      ) : (
        <button
          className="groupCard-wrapper__join-btn"
          onClick={() => handleLeaveGroup()}
        >
          <Icon
            style={{ marginRight: "4px" }}
            color="#1d3a57"
            size={12}
            icon="leave"
          />{" "}
          Leave
        </button>
      )}
    </div>
  );
};
export default GroupCard;

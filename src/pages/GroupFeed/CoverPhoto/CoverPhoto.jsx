import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Icon from "../../../components/SharedComponents/IcoMoon/IcoMoon";
import AppModal from "../../../components/SharedComponents/Modal/Modal";
import Button from "../../../components/SharedComponents/Button/Button";

import {
  joinPrivateGroup_service,
  joinPublicGroup_service,
  leaveGroup_service,
  cancelRequest_service,
} from "../../../Services/group-services";

import "./styles.scss";

const Coverphoto = ({
  image,
  isMember,
  children,
  isJoinRequested,
  isLoading,
}) => {
  const groupData = useSelector((state) => state.selectedGroupData);
  const isAdmin = useSelector((state) => state.loggedInUserIsAdmin);
  const history = useHistory();
  const dispatch = useDispatch();

  const iconState = groupData.isJoinRequested ? "down-arrow" : "plus";

  const [showmodal, setShowmodal] = useState(false);
  const [buttonText, setButtonText] = useState(null);
  const [buttonIcon, setButtonIcon] = useState(iconState);
  const [showActions, setShowActions] = useState(false);
  const [action, setAction] = useState();

  const actions = {
    leave: {
      title: "Leave Group",
      icon: "leave",
      onClick: () => handleLeaveGroup(),
    },
    cancel: {
      title: "Cancel Request",
      icon: "close",
      onClick: () => cancelRequest(),
    },
  };

  const innerRef = useCallback((node) => {
    if (node !== null) {
      node.focus();
    }
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
        groupData.privacy === "Private"
          ? await joinPrivateGroup_service(groupData.id)
          : await joinPublicGroup_service(groupData.id);
      if (response) {
        if (groupData.privacy === "Private") {
          setButtonText("Requested");
        } else {
          setButtonText("Joined");
        }
        setButtonIcon("down-arrow");
      }
    }
  }

  function setBtnInitialState() {
    setShowActions(false);
    setButtonIcon("plus");
    setButtonText("Join");
  }

  function handleLeaveGroup() {
    const adminList = groupData.memberListPaging.data
      ? groupData.memberListPaging.data.filter((member) => member.isAdmin === true)
      : [];
    if (adminList.length < 2 && isAdmin) {
      toast.error(
        "You are the only admin, please select another admin before leaving the group.",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    } else {
      setShowmodal(true);
    }
  }

  async function leaveGroup() {
    const response = await leaveGroup_service(groupData.id);
    if (response) {
      setBtnInitialState();
      setShowmodal(false);
      dispatch({
        type: "LEAVE_GROUP",
        groupid: groupData.id,
      });
      history.push("/");
    } else {
      setShowActions(false);
      toast.error("Error occured!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  async function cancelRequest() {
    const response = await cancelRequest_service(groupData.id);
    if (response) {
      setBtnInitialState();
    } else {
      setShowActions(false);
      toast.error("Error occured!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  function onBlurEvent(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowActions(false);
    }
  }
  function getButtonText() {
    if (isMember) {
      return "Joined";
    } else if (isJoinRequested) {
      return "Requested";
    } else {
      return "Join Group";
    }
  }
  function getButtonIcon() {
    if (isMember) {
      return "down-arrow";
    } else if (isJoinRequested) {
      return "down-arrow";
    } else {
      return "plus";
    }
  }

  useEffect(() => {
    setButtonText(getButtonText());
    setButtonIcon(getButtonIcon());
  }, [groupData]);

  return (
    <>
      <AppModal
        header="Leave group"
        onClose={() => setShowmodal(false)}
        shown={showmodal}
        centered="true"
        body={"Are you sure you want to leave this group?"}
      >
        <Button
          className="submit-btn"
          text={"Yes"}
          size={"medium"}
          onSubmitHandler={() => leaveGroup()}
        />
        <Button
          className="primary-light"
          text={"No"}
          size={"medium"}
          onSubmitHandler={() => setShowmodal(false)}
        />
      </AppModal>
      <div className="photo" style={{ background: `url(${image})` }}>
        {children}
        <button
          className="join-button"
          disabled={isLoading}
          onClick={() => joinGroup()}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <>
              {buttonText}
              <Icon size={14} style={{ marginLeft: "8px" }} icon={buttonIcon} />
            </>
          )}
        </button>
        <div className="back-btn-cover d-md-none" onClick={()=> history.push("/")}>
          <Icon
            disableFill={true}
            icon={"left-arrow"}
            size={"15px"}
            color={"#fff"}
          />
        </div>
        {showActions && (
          <div
            className="photo__join-actions"
            tabIndex={0}
            ref={innerRef}
            onBlur={(e) => onBlurEvent(e)}
          >
            <button onClick={action.onClick}>
              <Icon
                style={{ marginRight: "8px" }}
                size={12}
                icon={action.icon}
              />
              {action.title}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Coverphoto;

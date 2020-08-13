import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

import Feed from "../../../components/MainComponents/Feed/feed";
import SideWidget from "../../../components/MainComponents/SideWidgets/SideWidgets";
import Button from "../../../components/SharedComponents/Button/Button";
import modal from "../../../components/SharedComponents/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../../../components/SharedComponents/EmptyState/EmptyState";
import SearchBar from "../../../components/SharedComponents/SearchBar/SearchBar";
import { addMembers_service } from "../../../Services/group-services";
import { toast } from "react-toastify";

import "./styles.scss"; 

function Discussion({
  groupId,
  isPrivateFeed,
  handleLoadMore,
  nextPage,
  isMember,
}) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.selectedGroupData);
  const isAdmin = useSelector((state) => state.loggedInUserIsAdmin);
  const selectedMembers = useSelector((state) => state.selectedMembers);
  const [showAddMember, setShowAddMember] = useState(false);

  let id = groupId;

  function handleAddMember(show) {
    setShowAddMember(show);
  }

  async function addSelectedMembers() {
    const response = await addMembers_service(id, selectedMembers);
    if (response.status == 200) {
      setShowAddMember(false);
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
  return (
    <div className="groups-discussion-wrapper">
      <Row className="layout-feeds container" noGutters="true">
        <Col md={12} lg={8}>
          <div className="layout-main-content">
            {!isPrivateFeed ? (
              <Feed
                isGroup={true}
                isMember={isMember}
                groupId={id}
                loadMore={handleLoadMore}
                nextPage={nextPage ? true : false}
              />
            ) : (
              <EmptyState
                icon={"exclamation"}
                size="40"
                color={"#858EA2"}
                message={"This is a private group, you must be a member first."}
              />
            )}
          </div>
        </Col>
        <Col md={4}>
          <div className="layout-right-content d-none d-lg-block">
            {data.description && (
              <SideWidget
                data={data.description}
                header="Group Description"
                type="Text"
              />
            )}
            <SideWidget
              data={data.memberListPaging && data.memberListPaging.data}
              header="Members"
              type="Listing"
              emptyState={"No members yet"}
              size={20}
            >
              {isAdmin ? (
                <button
                  onClick={() => handleAddMember(true)}
                  className="btn add-members"
                >
                  Add
                </button>
              ) : null}
            </SideWidget>
            <modal
              header={"Add Member"}
              body={<SearchBar />}
              shown={showAddMember}
              size={"md"}
              onClose={() => handleAddMember(false)}
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
                onSubmitHandler={() => handleAddMember(false)}
              />
            </modal>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Discussion;

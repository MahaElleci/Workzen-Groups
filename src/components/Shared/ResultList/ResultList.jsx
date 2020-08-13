import React, { useState } from "react";
import "./styles.scss";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function ResultListComponent({ members }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.selectedGroupData);
  const [selectedMembers, setSelectedMembers] = useState(new Set());
  const handleChange = (selected) => {
    if (selectedMembers.has(selected)) {
      selectedMembers.delete(selected);
    } else {
      selectedMembers.add(selected);
    }
    setSelectedMembers(selectedMembers);
    dispatch({
      type: "SELECT_MEMBERS",
      members: Array.from(selectedMembers),
    });
  };
  const checkIfExist = (memberId) => {
    const existed = data.memberListPaging.data.some((m) => m.userid === memberId);
    return existed;
  };
  return (
    <ul className="groups-results-list">
      {members &&
        members.map((member, index) => (
          <li key={index}>
            <Form.Check
              onChange={(e) => handleChange(e.target.value)}
              custom
              value={member.id}
              type={"checkbox"}
              id={"member" + index + 1}
              label={""}
              disabled={checkIfExist(member.id)}
            />

            <img
              style={{
                width: "50px",
                display: "block",
                borderRadius: "50%",
                height: "50px",
              }}
              src={
                member.image
                  ? member.image
                  : "https://www.globaleaks.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
              }
            />
            <div className="member-info">
              <h4 className="member-info__name">
                {member.displayName}{" "}
                {checkIfExist(member.id) ? <small>(Existed)</small> : null}
              </h4>
              <h6 className="member-info__job">{member.jobTitle}</h6>
            </div>
          </li>
        ))}
    </ul>
  );
}

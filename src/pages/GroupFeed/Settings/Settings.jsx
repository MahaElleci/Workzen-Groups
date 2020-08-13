import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import { Form, Row, Col } from "react-bootstrap";

import Button from "../../../components/SharedComponents/Button/Button";
import HeaderBar from "../../../components/SharedComponents/HeaderBar/HeaderBar";

import { editGroup_service } from "../../../Services/groupAdmin-services";

import "./styles.scss";

function Settings() {
  const history = useHistory();
  const data = useSelector((state) => state.selectedGroupData);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const [validated, setValidated] = useState(false);
  const [groupName, setGroupName] = useState(data.name);
  const [groupDiscription, setGroupDiscription] = useState(data.description);
  const [groupPrivacy, setGroupPrivacy] = useState(data.privacy);

  async function editGroup(groupObj) {
    const response = await editGroup_service(data.id, groupObj);
    if (response) {
      toast("Group settings updated!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "groups-toast",
        onClose: () => history.push(`/groups/${data.id}/discussion`),
      });
    }
  } 
  
  function handleSubmit() {
    let formData = {};
    formData.groupName = groupName;
    formData.groupDiscription = groupDiscription;
    formData.groupPrivacy = groupPrivacy;
    if (!formData.groupName || !formData.groupDiscription) {
      setValidated(true);
    } else {
      // Updating groupObj
      const groupObj = data;
      groupObj["name"] = formData.groupName;
      groupObj["description"] = formData.groupDiscription;
      groupObj["privacy"] = formData.groupPrivacy;
      groupObj["userid"] = loggedInUser.id;

      editGroup(groupObj);
    }
  }
  function handleCancel() {
    setValidated(false);
    history.goBack();
  }
  return (
    <>
      <div className="groups-settings-wrapper">
        <HeaderBar title="Group Settings" />
      </div>
      <div className="groups-settings-form">
        <Form noValidate validated={validated}>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label className="groups-settings-form__label" column sm={2}>
              Group Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                onChange={(e) => setGroupName(e.target.value)}
                value={groupName}
                type="text"
                placeholder="Group Name"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a group name.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label className="groups-settings-form__label" column sm={2}>
              Discription
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="Group Discription"
                value={groupDiscription}
                required
                onChange={(e) => setGroupDiscription(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a group description.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label className="groups-settings-form__label" column sm={2}>
                Privacy
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Public"
                  name="groupPrivacy"
                  id="groupPrivacyO"
                  value={"Public"}
                  checked={groupPrivacy === "Public"}
                  onChange={(e) => setGroupPrivacy(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Private"
                  name="groupPrivacy"
                  id="groupPrivacy1"
                  value={"Private"}
                  checked={groupPrivacy === "Private"}
                  onChange={(e) => setGroupPrivacy(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Secret"
                  name="groupPrivacy"
                  id="groupPrivacy3"
                  value={"Secret"}
                  checked={groupPrivacy === "Secret"}
                  onChange={(e) => setGroupPrivacy(e.target.value)}
                />
              </Col>
            </Form.Group>
          </fieldset>
          <Form.Group as={Row} className="groups-settings-form__action-btns">
            <Col sm={{ span: 2, offset: 8 }}>
              <Button
                text={"Cancel"}
                size={"medium"}
                className={"primary-light"}
                onSubmitHandler={() => handleCancel()}
              />
            </Col>
            <Col sm={2}>
              <Button
                text={"Save"}
                size="medium"
                className={"primary"}
                onSubmitHandler={() => handleSubmit()}
              />
            </Col>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default Settings;

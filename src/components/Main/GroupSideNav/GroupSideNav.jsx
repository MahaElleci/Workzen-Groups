import React, { useEffect, useState } from "react";

import { ListGroup } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Icon from "../../Shared/IcoMoon/IcoMoon";
import Spinner from "../../Shared/Loader/Loader";
 
import "./styles.scss"; 

const GroupSideNav = () => { 
  const history = useHistory();
  const data = useSelector((state) => state.selectedGroupData);
  const [isLoading, setIsLoading] = useState(false); 

  function handleBackButton() {
    history.push("/");
    window.scrollTo(0, 0);
  } 

  useEffect(() => {
    data.name ? setIsLoading(false) : setIsLoading(true);
  }, [data.name]);
  return (
    <>
      <div className="groups-side-nav">
        {isLoading ? (
          <div className="loader-placeholder">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="groups-side-nav__header">
              <span
                onClick={() => handleBackButton()}
                className="groups-side-nav__back-btn"
              >
                <Icon
                  disableFill={true}
                  icon={"left-arrow"}
                  size={"20px"}
                  color={"#1d3a57"}
                />
              </span>
              <div className="groups-side-nav__title">
                <h5 className="groups-side-nav__title__name">{data.name}</h5>
                <small className="groups-side-nav__title__privacy">
                  {data.privacy} Group
                </small>
              </div>
            </div>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <NavLink to={`/groups/${data.id}/discussion`}>
                  Discussion
                </NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink to={`/groups/${data.id}/members`}>Members</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink to={`/groups/${data.id}/files`}>Files</NavLink>
              </ListGroup.Item>
              <ListGroup.Item>
                <NavLink to={`/groups/${data.id}/media`}>Media</NavLink>
              </ListGroup.Item>
            </ListGroup>
          </>
        )}
      </div>
    </>
  );
};

export default GroupSideNav;

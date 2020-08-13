import React from "react";

import { Dropdown, DropdownButton } from "react-bootstrap";
import Icon from "../IcoMoon/IcoMoon";

import "./styles.scss";

const ActionsDropdown = ({ items }) => {
  return (
    <div className="groups-dropdowns">
      <DropdownButton
        className="groups-dropdowns__toggle"
        id="dropdown-item-button"
        title=""
      >
        {items.map((item, i) => {
          return (<Dropdown.Item
            key={i}
            className={`groups-dropdowns__item ${item.class}`}
            as="button"
            onClick={(e) => item.onClick(e)}
          >
            {item.icon && <Icon icon={item.icon} size="14" />}
            {item.title}

          </Dropdown.Item>)
        })}
      </DropdownButton>
    </div>
  );
};
export default ActionsDropdown;

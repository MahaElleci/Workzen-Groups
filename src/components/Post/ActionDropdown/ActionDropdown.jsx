import React, { Component } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import Icon from '../../Shared/IcoMoon/IcoMoon'
import './styles.scss';
export class ActionDropdown extends Component {
  render() {
    return (
      <div className="post-dropdowns">
        <DropdownButton className="post-dropdowns__toggle" id="dropdown-item-button" title="">
          <Dropdown.Item className="post-dropdowns__item" as="button"><Icon icon="edit-post" size="14" /> Edit</Dropdown.Item>
          <Dropdown.Item className="post-dropdowns__item warning" as="button"><Icon icon="trash" size="14" /> Delete</Dropdown.Item>
          <Dropdown.Item className="post-dropdowns__item" as="button"><Icon icon="bookmark" size="14" /> Save Post</Dropdown.Item>
        </DropdownButton>
      </div>
    )
  }
}

export default ActionDropdown

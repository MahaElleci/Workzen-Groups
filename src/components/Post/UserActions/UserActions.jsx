import React, { Component } from "react";
import Icon from "../../Shared/IcoMoon/IcoMoon";
import './styles.scss';

export class UserActions extends Component {
  handleLike = () => {};
  handleComment = () => {};
  render() {
    return (
      <div className="actions-wrapper">
        <button onClick={this.handleLike} className="actions-wrapper__btn">
          <Icon icon="like" size="16" />
          <span className="actions-wrapper__btn-text">Like</span>
        </button>
        <button onClick={this.handleComment} className="actions-wrapper__btn">
          <Icon icon="comment" size="16" />
          <span className="actions-wrapper__btn-text">Comment</span>
        </button>
      </div>
    );
  }
}

export default UserActions;

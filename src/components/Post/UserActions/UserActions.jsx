import React, { Component } from "react";
import Icon from "../../Shared/IcoMoon/IcoMoon";
import './styles.scss';

export class UserActions extends Component {
  constructor() {
    super();
    this.state = {
      isLikeClicked: false
    }
  }

  handleLike = () => {
    this.setState((state) => {
      return { isLikeClicked: !state.isLikeClicked }
    });
  };
  
  handleComment = () => { };
  render() {
    return (
      <div className="actions-wrapper">
        <button onClick={() => this.handleLike()} className="actions-wrapper__btn">
          <Icon disableFill="true" color={this.state.isLikeClicked ? '#F97304' : '#555e71'} icon="like" size="16" />
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

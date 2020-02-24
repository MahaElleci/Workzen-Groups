import React, { Component } from 'react'

export class CommentBox extends Component {
    constructor() {
        super();
        this.state = {
            value: "Write a comment"
        }
    }
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }
    handleBlur = (event) => {
        if (!event.target.value) {
           this.setState({value: "Write a comment"});
        }
    }
    render() {
        return (
            <div className="post-card__comment-box">
                <input type="text" placeholder={this.state.value} onBlur={this.handleBlur} onChange={this.handleChange}></input>
            </div>
        )
    }
}

export default CommentBox

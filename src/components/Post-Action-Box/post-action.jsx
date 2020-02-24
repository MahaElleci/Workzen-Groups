import React, { Component } from "react";
import Button from "../Shared/Button/Button";
import { data } from "../../data/data";
class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Share something",
      userImage:
        "https://www.globaleaks.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
      currentData: data.postsData
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { image } = this.props.data.loggedInUser;
    this.setState({
      userImage: image
    });
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let postContent = this.state.value;
    const { loggedInUser } = this.props.data;
    const postObj = {
      id: 847,
      content: postContent,
      userInfo: loggedInUser
    };
    this.setState(prevState => ({
      currentData: [...prevState.currentData, postObj]
    }));
    data.postsData.push(postObj);

    event.preventDefault();
  }
  clearInput() {
    if (this.state.value === "Share something")
      this.setState({
        value: ""
      });
  }
  render() {
    return (
      <form className="createPost" onSubmit={this.handleSubmit}>
        <textarea
          className="createPost__textarea"
          onClick={() => this.clearInput()}
          value={this.state.value}
          onChange={this.handleChange}
        ></textarea>
        <img className="userImage" src={this.state.userImage} />
        <Button text={"Post"}></Button>
      </form>
    );
  }
}
export default CreatePost;

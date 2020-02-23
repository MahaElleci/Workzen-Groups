import React, { Component } from 'react'
import Post from '../Post/Post'

export class Feed extends Component {
    render() {
        return (
            <div className="post-list">
                <Post />
                <Post />
            </div>
        )
    }
}

export default Feed

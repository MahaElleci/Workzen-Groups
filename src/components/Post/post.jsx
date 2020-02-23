import React, { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Button from '../Shared/Button/Button'
import CommentBox from '../Post/Comment-Box/CommentBox'

export class Post extends Component {
    render() {
        return (
            <div className="post-card">
                <Container>
                    <Row>
                        <Col>UserInfo</Col>
                    </Row>
                    <Row>
                        <Col>Post Content</Col>
                    </Row>
                    <Row className="post-card__comment-row">
                        <Col md={10}>
                            <CommentBox />
                        </Col>
                        <Col md={2}>
                            <Button />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Post;

import React, { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Feed from '../Feed/Feed'

export class Layout extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col md={9}>
                        <Feed />
                    </Col>
                    <Col md={3}>Placeholders</Col>
                </Row>

            </Container>
        )
    }
}

export default Layout

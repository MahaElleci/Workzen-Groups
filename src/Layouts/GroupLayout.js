import React from 'react';
import GroupSideNav from '../components/MainComponents/GroupSideNav/GroupSideNav';
import { Container } from 'react-bootstrap';
import SideContentPlaceholder from '../components/MainComponents/SideContenPlaceholder/SideContentPlaceholder';

export default function GroupLayout({ children }) {
    return (
        <div className="groups-layout-wrapper">
            <SideContentPlaceholder>
                <GroupSideNav style={{ maxWidth: '300px' }} />
            </SideContentPlaceholder>
            <Container fluid style={{ padding: "0" }}>
                {children}
            </Container>
        </div>
    )
}

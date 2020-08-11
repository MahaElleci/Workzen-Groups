import React from 'react'
import SideNavigation from '../MainComponents/SideNavigation/SideNavigation';
import { Container } from 'react-bootstrap';
import SideContentPlaceholder from '../MainComponents/SideContenPlaceholder/SideContentPlaceholder';


export default function MainLayout({ children }) {
    return (
        <div className="groups-layout-wrapper">
            <SideContentPlaceholder>
                <SideNavigation style={{ maxWidth: '300px' }} />
            </SideContentPlaceholder>
            <Container fluid style={{ padding: "0" }}>
                {children}
            </Container>
        </div>
    )
}

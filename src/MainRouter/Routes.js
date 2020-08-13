import React from "react";
import GroupFeed from "../pages/GroupFeed/GroupFeed";
import GroupsActivityPage from "../pages/RecentSocialFeed/GroupsActivityPage";
import GroupsListing from "../pages/GroupsListing/GroupsListing";
import MainLayout from "../Layouts/MainLayout";
import GroupLayout from "../Layouts/GroupLayout";
import {
    Redirect
} from "react-router-dom";

const routes = [
    {
        layout: MainLayout,
        subRoutes: [{
            path: '/',
            exact: true,
            render: () => <Redirect to="/workzen-socialfeed" />
        },
        {
            path: '/workzen-socialfeed',
            render: () => <GroupsActivityPage />
        },
        {
            path: '/mygroups',
            render: () => <GroupsListing type={"MyGroups"} />,
            type: 'MyGroups'
        },
        {
            path: '/discover',
            render: () => <GroupsListing type={"ExploreGroups"} />,
            type: 'ExploreGroups'
        }
        ]
    },
    {
        layout: GroupLayout,
        subRoutes: [{
            path: '/groups/:id',
            render: (props) => <GroupFeed {...props} />
        }
        ]
    }
];

export default routes;
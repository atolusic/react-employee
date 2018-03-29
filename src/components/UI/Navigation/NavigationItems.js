import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

const navigation = (props) => {
    return (
        <ul>
            <NavigationItem link="/">Dashboard</NavigationItem>
            <NavigationItem link="/employees">Employees</NavigationItem>
        </ul>
    );
}

export default navigation;
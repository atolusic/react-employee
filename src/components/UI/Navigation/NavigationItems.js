import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import Logo from '../Logo/Logo';

const navigation = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/dashboard">Dashboard</NavigationItem>
            <Logo />
            <NavigationItem link="/employees">Employees</NavigationItem>
        </ul>
    );
}

export default navigation;
import React from 'react';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import Logo from '../Logo/Logo';
import { startLogout } from '../../../store/actions/auth';

const navigation = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/dashboard">Dashboard</NavigationItem>
            <Logo />
            <NavigationItem link="/employees">Employees</NavigationItem>
            <NavigationItem clicked={props.startLogout}>Logout</NavigationItem>
        </ul>
    );
}

export default connect(null, { startLogout })(navigation);
import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <li onClick={props.clicked} className={classes.NavigationItem}>
            <NavLink to={props.link}>
                {props.children}
            </NavLink>
        </li>
    );
}

export default navigationItem;
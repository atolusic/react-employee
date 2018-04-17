import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <li onClick={props.clicked} className={props.userPhoto ? classes.NavigationItemPhoto : classes.NavigationItem}>
            {props.link ? <NavLink to={props.link}>
                {props.children}
            </NavLink> : <button>{props.children}</button>}
        </li>
    );
}

export default navigationItem;
import React from 'react';

import classes from './Button.css';

const button = (props) => {
    return <button
                onClick={props.delete ? props.delete : null}
                className={props.delete ? classes.Button__orange : classes.Button}
                disabled={props.disabled}>
                {props.children}
            </button>
}

export default button;
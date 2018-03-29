import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';

const employee = (props) => {
    return (
        <Auxiliary>
            <li onClick={() => props.showDetails(props.employee)}>
                {props.employee.name}
            </li>
            <button onClick={() => props.delete(props.employee)}> X </button>
        </Auxiliary>
    );
}

export default employee;
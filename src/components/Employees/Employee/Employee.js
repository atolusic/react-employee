import React from 'react';

import Aux from '../../../hoc/Aux';

const employee = (props) => {
    return (
        <Aux>
            <li onClick={() => props.showDetails(props.employee)}>
                {props.employee.name}
            </li>
            <button onClick={() => props.delete(props.employee)}> X </button>
        </Aux>
    );
}

export default employee;
import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';

const employee = (props) => {
    return (
        <Auxiliary>
            <li onClick={() => props.showDetails(props.employee)}>
                <span>Name: {props.employee.name}</span>
                <span>Age: {props.employee.age}</span>
            </li>
            <button onClick={() => props.delete(props.employee)}> X </button>
        </Auxiliary>
    );
}

export default employee;
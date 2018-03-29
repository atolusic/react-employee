import React from 'react';

import Aux from '../../../hoc/Aux';
import EmployeeForm from '../../EmployeeForm/EmployeeForm';

const addEmployee = (props) => {
    return (
        <Aux>
            <h3>Add Employee</h3>
            <EmployeeForm add />
        </Aux>
    );
}

export default addEmployee;

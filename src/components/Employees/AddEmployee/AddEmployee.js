import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import EmployeeForm from '../../EmployeeForm/EmployeeForm';

const addEmployee = (props) => {
    return (
        <Auxiliary>
            <h3>Add Employee</h3>
            <EmployeeForm add />
        </Auxiliary>
    );
}

export default addEmployee;

import React from 'react';

const deleteModal = (props) => {
    return (
        <div>
            <p>Are you sure you want to delete {props.employee ? props.employee.name : ''}?</p>
            <button name="Yes" onClick={(e) => props.deleteHandler(e)}>Yes</button>
            <button name="No" onClick={(e) => props.deleteHandler(e)}>No</button>
        </div>
    );
}

export default deleteModal;
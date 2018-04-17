import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormErrors from '../EmployeeForm/FormErrors/FormErrors';
import Button from '../UI/Button/Button';
import { startLogin } from '../../store/actions/auth';
import Spinner from '../UI/Spinner/Spinner';

class Auth extends Component {
    render() {
        return (
            <div>
                <Button clicked={this.props.startLogin}>Log In With Google</Button>
            </div>
        );
    }
}

export default connect(null, { startLogin })(Auth);


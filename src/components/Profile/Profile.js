import React from 'react';
import { connect } from 'react-redux';

const Profile = ({ user }) => (
    <div>
        <img alt="user" src={user.photoURL} />
        <p>TOLE</p>
    </div>
);

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Profile);


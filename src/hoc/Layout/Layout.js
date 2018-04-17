import React from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary';
import Navigation from '../../components/UI/Navigation/NavigationItems';

const Layout = (props) => {
    return (
        <Auxiliary>
            <main>
                {props.uid ? <Navigation /> : null}
                {props.children}
            </main>
        </Auxiliary>
    );
}

const mapStateToProps = state => ({
    uid: state.auth.uid
});

export default connect(mapStateToProps)(Layout);
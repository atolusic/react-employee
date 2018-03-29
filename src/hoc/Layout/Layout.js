import React from 'react';

import Auxiliary from '../Auxiliary';
import Navigation from '../../components/UI/Navigation/NavigationItems';

const Layout = (props) => {
    return (
        <Auxiliary>
            <main>
                <Navigation />
                {props.children}
            </main>
        </Auxiliary>
    );
}

export default Layout;
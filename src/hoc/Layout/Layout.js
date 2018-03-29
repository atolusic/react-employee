import React from 'react';

import Aux from '../Aux';
import Navigation from '../../components/UI/Navigation/NavigationItems';

const Layout = (props) => {
    return (
        <Aux>
            <main>
                <Navigation />
                {props.children}
            </main>
        </Aux>
    );
}

export default Layout;
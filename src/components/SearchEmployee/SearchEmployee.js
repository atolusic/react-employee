import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';

class SearchEmployee extends Component {
    render() {
        return (
            <Auxiliary>
                <h4>Search Employee by name</h4>
                <input disabled={this.props.employees} type="text" value={this.props.search} onChange={(e) => this.props.searchHandler(e)} />
            </Auxiliary>
        );
    }
}

export default SearchEmployee;
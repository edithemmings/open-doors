import React, { Component } from 'react';

class SelectedFilters extends Component {

    render() {
        return (
            <>
                <ul>
                    {this.props.filters.map(filter => (
                        <li>{filter}</li>
                    ))}
                </ul>
            </>
        )
    }
}


export default SelectedFilters;
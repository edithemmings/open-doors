import React, { Component } from 'react';

class SelectedFilters extends Component {

    render() {
        return (
            <>
                <ul className='selectedFilterContainer'>
                    {this.props.filters.map(filter => (
                        <li className='selectedFilter'>{filter}</li>
                    ))}
                </ul>
            </>
        )
    }
}


export default SelectedFilters;
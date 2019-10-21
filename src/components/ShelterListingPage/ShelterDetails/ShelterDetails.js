import React, { Component } from 'react';
import { connect } from "react-redux";

class ShelterDetails extends Component {
    render() {
        return (
            <>
                {Array.isArray(this.props.reduxState.shelters) ?
                    <div className='listingCard' onClick={this.goToDetailsPage}>
                        {this.props.reduxState.shelters.map((shelter) => {
                            if (shelter.id == this.props.match.params.id){
                                return <div key={shelter.id}>
                                    <h3>{shelter.name}</h3>
                                    <p>{shelter.location}</p>
                                    <p>{shelter.phone}</p>
                                    <p>{shelter.website}</p>
                                    <ul>
                                        {shelter.tags.map(tag => {
                                            return <li>{tag}</li>
                                        })}
                                    </ul>
                                    <ul>
                                        {shelter.types.map(type => {
                                            return <li>{type.type}, {type.count}/{type.capacity}</li>
                                        })}
                                    </ul>
                                    {/* <li>{JSON.stringify(shelter)}</li> */}
                                </div>
                            }
                        })}</div>
                    : 'error, try refreshing'}
            </>
        )
    }
}

const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterDetails);

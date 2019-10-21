import React, { Component } from 'react';

class ShelterList extends Component {
    render() {
        return (
            <>
                {Array.isArray(this.props.shelters) ?
                    <div>                    
                    {this.props.shelters.map((shelter) => {
                        return <div key={shelter.id} className='listingCard' value={shelter.id} onClick={() => this.props.goToDetailsPage(shelter.id)}>
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
                    })}
                    </div>
                    : ''}
            </>
        )
    }
}


export default ShelterList;
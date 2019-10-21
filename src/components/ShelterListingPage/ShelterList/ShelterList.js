import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'
import axios from 'axios'
class ShelterList extends Component {
    getTimeStamp = () => {
        // axios.get('/api/timestamp')
    }
    render() {
        return (
            <>
                {Array.isArray(this.props.shelters) ?
                    <div>
                        {this.props.shelters.map((shelter) => {
                            return <div key={shelter.id} className='listingCard' value={shelter.id} onClick={() => this.props.goToDetailsPage(shelter.id)}>
                                <Card.Group centered>
                                    <Card>
                                        <Card.Content>
                                            <Card.Header>
                                                <Card.Header>{shelter.name}</Card.Header>
                                            </Card.Header>
                                        </Card.Content>
                                        <Card.Content>
                                            <ul>
                                                {shelter.types.map(type => {
                                                    return <li>{type.type}, {type.count}/{type.capacity}</li>
                                                })}
                                            </ul>
                                        </Card.Content>
                                        <Card.Content>
                                            <Button value={shelter.phone}>Call</Button>
                                        </Card.Content>
                                    </Card>
                                </Card.Group>
                            </div>
                        })}
                    </div>
                    : ''}
            </>
        )
    }
}


export default ShelterList;
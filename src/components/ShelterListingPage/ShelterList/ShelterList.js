import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'


class ShelterList extends Component {

    subtractDate = (date) => {
        // console.log(date.replace(/-/g, '/').replace(/T/g, ' '), new Date())
        let difInMillis = Math.abs(new Date() - new Date(date.replace(/-/g, '/').replace(/T/g, ' ')))
        let difInMinutes = Math.floor((difInMillis / 1000) / 60);
        let difInHours = Math.floor((difInMinutes) / 60);
        let difInDays = Math.floor((difInHours) / 24);
        console.log(difInMinutes, difInHours, difInDays)
        if (difInDays > 1) {
            return difInDays + ' days';
        } else if (difInDays === 1) {
            return '1 day';
        } else if (difInHours > 1) {
            return difInHours + ' hours';
        } else if (difInHours === 1) {
            return '1 hour';
        } else if (difInMinutes === 1) {
            return '1 min';
        } else {
            return difInMinutes + ' mins';
        }

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
                                            {shelter.timestamp ? <p>Updated {this.subtractDate(shelter.timestamp)} ago</p> : ''}
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
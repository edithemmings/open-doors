import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'

class ListCard extends Component {

    render() {
        return (
            <>
                <Card.Group centered>
                    <Card>
                        <Card.Content>
                            <Card.Header>
                                <Card.Header>{this.props.shelter.name}</Card.Header>
                            </Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <ul>
                                {this.props.shelter.types.map(type => {
                                    return <li>{type.type}, {type.count}/{type.capacity}</li>
                                })}
                            </ul>
                            {this.props.shelter.timestamp ? 
                                <p>Updated {this.props.subtractDate(this.props.shelter.timestamp)} ago</p> 
                            : '--'}
                            {this.props.distance ? 
                                <p>{this.props.distance} miles away</p> 
                            : '--'}
                        </Card.Content>
                        <Card.Content>
                            <Button value={this.props.shelter.phone}>Call</Button>
                        </Card.Content>
                    </Card>
                </Card.Group>

            </>
        )
    }
}


export default ListCard;
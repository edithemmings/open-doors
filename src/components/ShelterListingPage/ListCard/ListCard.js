import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react'
import '../ShelterListing.css'
import classNames from 'classnames'

class ListCard extends Component {

    render() {
        return (
            <>
                <div className='card'>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                                <Card.Header><span className='titleOnCard'>{this.props.shelter.name}</span></Card.Header>
                            </Card.Header>
                        </Card.Content>
                        <Card.Content><div className='cardInnerContent'>
                            {/* {JSON.stringify(this.props.shelter)} */}
                            <ul className='typesOnCard'>
                                {this.props.shelter.types.map(type => {
                                            return <li className='type'>
                                                {type.capacity ? <span className={classNames({
                                                    'availability': true,
                                                    'redStatus': (type.capacity - type.count) === 0,
                                                    'yellowStatus': (type.capacity - type.count) <= 5 && (type.capacity - type.count) > 0,
                                                    'greenStatus': (type.capacity - type.count) > 5,
                                                })}>
                                                    <span className='count'>{type.capacity - type.count}</span>
                                                    <span className='capacity'> beds available</span>
                                                </span>
                                                    : '--  '}
                                                    {this.props.shelter.type_names.map(typeName => {
                                                        if (type.type_id == typeName.id){
                                                            return <span className='typeName'>{typeName.type}</span>
                                                        }
                                                    })}
                                            </li>
                                })//end loop through types
                            }
                            </ul>
                            <ul className='typesOnCard'>
                                <li>
                                    {this.props.shelter.timestamp ?
                                        <p><Icon name='clock outline' /> Updated {this.props.subtractDate(this.props.shelter.timestamp)} ago</p>
                                        : <p><Icon name='clock outline' /> Last updated --</p>}
                                </li>
                                <li>
                                    {this.props.distance !== '--' ?
                                        <p className={classNames({
                                            'redStatus': this.props.distance > 3,
                                            'greenStatus': this.props.distance <= 3,
                                        })}><Icon name='map pin' /> {this.props.distance} miles away</p>
                                        : <p><Icon name='map pin' /> Distance away --</p>}
                                </li>
                            </ul>
                        </div>
                        </Card.Content>
                    </Card>
                </div>

            </>
        )
    }
}


export default ListCard;
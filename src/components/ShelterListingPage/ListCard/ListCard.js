import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'
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
                            <ul className='typesOnCard'>
                                {this.props.shelter.types.map(type => {
                                    return <li className='type'>
                                        {type.capacity ? <span className={classNames({
                                            'availability': true,
                                            'redStatus': (type.count / type.capacity) >= 0.9,
                                            'yellowStatus': (type.count / type.capacity) < 0.9 && (type.count / type.capacity) >= 0.6,
                                            'greenStatus': (type.count / type.capacity) < 0.6,
                                        })}>
                                            <span className='count'>{type.count}/</span>
                                            <span className='capacity'>{type.capacity} beds</span></span> : '--  '}
                                        <span className='typeName'>{type.type}</span>
                                    </li>
                                })}
                            </ul>
                            <ul className='typesOnCard'>
                                <li>
                                    {this.props.shelter.timestamp ?
                                        <p>Updated {this.props.subtractDate(this.props.shelter.timestamp)} ago</p>
                                        : 'Last updated --'}
                                </li>
                                <li>
                                    {this.props.distance !== '--' ?
                                        <p className={classNames({
                                            'redStatus': this.props.distance > 3,
                                            'yellowStatus': this.props.distance <= 3 && this.props.distance > 1,
                                            'greenStatus': this.props.distance <= 1,
                                        })}>{this.props.distance} miles away</p>
                                        : 'Distance away --'}
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
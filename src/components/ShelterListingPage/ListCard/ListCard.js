import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react'
import '../ShelterListing.css'
import classNames from 'classnames'
import {connect} from 'react-redux'

class ListCard extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TYPES' });
    }
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
                            {this.props.reduxState.types ? <ul className='typesOnCard'>
                                {this.props.shelter.types.map(type => {
                                    let typeName = '--';
                                    this.props.reduxState.types.forEach(type2 => {
                                        if (type2.id === type.type_id){
                                            typeName = type2.type
                                        }
                                    })
                                    return <li className='type'>
                                        {type.capacity ? <span className={classNames({
                                            'availability': true,
                                            'redStatus': (type.capacity - type.count) === 0,
                                            'yellowStatus': (type.capacity - type.count) <= 5 && (type.capacity - type.count) > 0,
                                            'greenStatus': (type.capacity - type.count) > 5,
                                        })}>
                                            {/* <span className='count'>{type.count}/</span>
                                            <span className='capacity'>{type.capacity} beds</span> */}
                                            <span className='count'>{type.capacity - type.count}</span>
                                            <span className='capacity'> beds available</span>
                                            </span>
                                            : '--  '}
                                        <span className='typeName'>{typeName}</span>
                                    </li>
                                })}
                            </ul> : ''}
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
                                        })}><Icon name='map pin'/> {this.props.distance} miles away</p>
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
        
const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ListCard);
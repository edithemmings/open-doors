import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Tab, Input } from 'semantic-ui-react'
import Axios from 'axios';
import { Link } from 'react-router-dom'
import '../UserPortal.css'
import classNames from 'classnames'
import '../../ShelterListingPage/ShelterListing.css'

class ShelterPortalHome extends Component {
    state = {}
    componentDidMount() {
        this.getUserGuestCounts();
    }
    getUserGuestCounts = () => {
        Axios.get(`/api/shelter/user/types/${this.props.shelter.id}`)
            .then((response) => {
                this.setState({
                    ...this.state,
                    typeCounts: response.data
                })
                // console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
    }
    handleClick = (id, upOrDown, count, capacity) => {
        if ((upOrDown === 'up' && count + 1 <= capacity) || (upOrDown === 'down' && count > 0)) {
            Axios.put(`/api/shelter/user/${upOrDown}/${id}`)
                .then(response => {
                    console.log('updated guest count')
                    this.getUserGuestCounts();
                }).catch(error => {
                    console.log(error)
                })
            // updates the time stamp of most recent bed availability update
            Axios.put('/api/timestamp', { timestamp: new Date() })
                .then(response => { console.log('updated timestamp') })
                .catch(error => { console.log(error) })
        } else {
            alert('out of range')
        }
    }
    handleInputChange = (event, keyName) => {
        this.setState({
            ...this.state,
            [keyName]: {
                count: event.target.value
            }
        });
        console.log(event.target.value, this.state)
    }
    handleInputSubmit = (id, keyName, capacity) => {
        console.log(this.state[keyName])
        if (this.state[keyName].count <= capacity && this.state[keyName].count >= 0) {
            Axios.put(`/api/shelter/user/set/${id}`, this.state[keyName])
                .then(response => {
                    console.log('updated guest count')
                    this.setState({
                        ...this.state,
                        [keyName]: ''
                    })
                    this.getUserGuestCounts();
                }).catch(error => {
                    console.log(error)
                })
        } else {
            alert('outside the range')
        }
    }
    render() {
        return (
            <>
                {this.state.typeCounts ? <div>

                    <Tab panes={[
                        {
                            menuItem: 'Incrementer',
                            render: () => <Tab.Pane><div className='incrementerContainer'>
                                {this.state.typeCounts.map(type => (
                                    <div key={type.id} className='incrementer'>
                                        {type.capacity ? <span className={classNames({
                                            'availability': true,
                                            'redStatus': (type.capacity - type.count) === 0,
                                            'yellowStatus': (type.capacity - type.count) <= 5 && (type.capacity - type.count) > 0,
                                            'greenStatus': (type.capacity - type.count) > 5,
                                        })}>
                                            <span className='count'>{type.count}/</span>
                                            <span className='capacity'>{type.capacity} <br/>beds occupied</span>
                                        </span>
                                            : '--  '}
                                        <span className='typeName'>{type.type} guests</span>
                                        <div className='incrementerBtns plus'>
                                            <Button
                                                circular
                                                size='massive'
                                                color='grey'
                                                onClick={() => this.handleClick(type.id, 'up', type.count, type.capacity)}
                                                icon='plus'
                                            />
                                        </div>
                                        <div className='incrementerBtns minus'>
                                            <Button
                                                basic circular color='grey'
                                                onClick={() => this.handleClick(type.id, 'down', type.count, type.capacity)}
                                                icon='minus'
                                            />
                                        </div>
                                    </div>
                                ))
                                }
                            </div>
                            </Tab.Pane>

                        },
                        {
                            menuItem: 'Setter',
                            render: () => <Tab.Pane>{
                                this.state.typeCounts.map(type => (
                                    <div key={type.id}>
                                        <h2>{type.count}/{type.capacity}</h2>
                                        <p>{type.type} guests</p>
                                        <Input
                                            type='number'
                                            onChange={(e) => this.handleInputChange(e, 'count' + type.id)} />
                                        <Button
                                            primary
                                            onClick={() => this.handleInputSubmit(type.id, 'count' + type.id, type.capacity)}
                                        >Set</Button>
                                    </div>
                                ))
                            }</Tab.Pane>
                        },
                    ]} />


                </div> : ''}

            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterPortalHome);
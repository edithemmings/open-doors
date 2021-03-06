import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Tab, Input } from 'semantic-ui-react'
import Axios from 'axios';
import { Link } from 'react-router-dom'
import '../UserPortal.css'
import classNames from 'classnames'
import '../../ShelterListingPage/ShelterListing.css'
import swal from 'sweetalert'

class ShelterPortalHome extends Component {
    state = {}
    componentDidMount() {
        this.getUserGuestCounts();
        this.props.dispatch({ type: 'GET_TYPES' });
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
            // alert('out of range')
            swal("Oops", "Out of range", "warning")
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
            // updates the time stamp of most recent bed availability update
            Axios.put('/api/timestamp', { timestamp: new Date() })
                .then(response => { console.log('updated timestamp') })
                .catch(error => { console.log(error) })
        } else {
            // alert('outside the range')
            swal("Oops", "Out of range", "warning")
        }
    }
    render() {
        return (
            <>
                {this.state.typeCounts ? <div>
                    <h1 className='homeTitle'>{this.props.shelter.name}</h1>
                    <div className='tabs'>
                        <Tab panes={[
                            {
                                menuItem: 'Incrementer',
                                render: () => <Tab.Pane><div className='incrementerContainer'>
                                    {this.state.typeCounts.map(type => (
                                        <div key={type.id} className='incrementer'>
                                            <div className='incrementerText'>
                                                {type.capacity ? <span className={classNames({
                                                    'availability': true,
                                                    'redStatus': (type.capacity - type.count) === 0,
                                                    'yellowStatus': (type.capacity - type.count) <= 5 && (type.capacity - type.count) > 0,
                                                    'greenStatus': (type.capacity - type.count) > 5,
                                                })}>
                                                    <span className='count'>{type.count}/</span>
                                                    <span className='capacity'>{type.capacity} <br />beds occupied</span>
                                                </span>
                                                    : `Please enter a capacity in settings for `}
                                                {this.props.reduxState.types.map(typeName => {
                                                    if (type.type_id == typeName.id) {
                                                        return <span className='typeName'>{typeName.type}</span>
                                                    }
                                                })}
                                            </div>
                                            <div className='incrementerBtns'>
                                                <div className='incrementerBtn plus'>
                                                    <Button
                                                        circular
                                                        size='massive'
                                                        // color='grey'
                                                        onClick={() => this.handleClick(type.id, 'up', type.count, type.capacity)}
                                                        icon='plus'
                                                    />
                                                </div>
                                                <div className='incrementerBtn minus'>
                                                    <Button
                                                        basic circular
                                                        // color='grey'
                                                        onClick={() => this.handleClick(type.id, 'down', type.count, type.capacity)}
                                                        icon='minus'
                                                    />
                                                </div>
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
                                        <div key={type.id} className='incrementer'>
                                            <div className='incrementerText'>
                                                {type.capacity ? <span className={classNames({
                                                    'availability': true,
                                                    'redStatus': (type.capacity - type.count) === 0,
                                                    'yellowStatus': (type.capacity - type.count) <= 5 && (type.capacity - type.count) > 0,
                                                    'greenStatus': (type.capacity - type.count) > 5,
                                                })}>
                                                    <span className='count'>{type.count}/</span>
                                                    <span className='capacity'>{type.capacity} <br />beds occupied</span>
                                                </span>
                                                    : `Please enter a capacity in settings for `}
                                                {this.props.reduxState.types.map(typeName => {
                                                    if (type.type_id == typeName.id) {
                                                        return <span className='typeName'>{typeName.type}</span>
                                                    }
                                                })}                                            </div>
                                            <div className='incrementerInputs'>
                                                <div className='incrementerInput input'>
                                                    <Input
                                                        type='number'
                                                        fluid
                                                        onChange={(e) => this.handleInputChange(e, 'count' + type.id)} />
                                                </div>
                                                <div className='incrementerInput btn'>
                                                    <Button
                                                        onClick={() => this.handleInputSubmit(type.id, 'count' + type.id, type.capacity)}
                                                    >Set</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }</Tab.Pane>
                            },
                        ]} />


                    </div> </div> : ''}

            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterPortalHome);
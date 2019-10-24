import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import Header from '../Header/Header'

class UserPortalSignUpSubmit extends Component {

    postShelter = () => {
        axios.post('/api/shelter/user/moreInfo', this.props.reduxState.signUpForm)
            .then(response => {
                console.log('shelter was posted', response)
                this.props.history.push('/home')
            }).catch(error => {
                console.log(error)
            })
    }
    handleBack = () => {
        this.props.history.push('/sign-up-4')
    }
    render() {
        let shelter = this.props.reduxState.signUpForm
        let shelterContact = this.props.reduxState.userShelter
        return (
            <div><Header
                icon1={'checkmark'}
                icon2={'checkmark'}
                icon3={'checkmark'}
                icon4={'checkmark'}
                value5={'Review'}
                color5={'grey'}
            />
                <div>
                    <h3>{shelterContact.name}, {shelterContact.id}</h3>
                    <p>{shelterContact.location}</p>
                    <p>Phone: {shelterContact.phone}</p>
                    <p>URL: {shelterContact.website}</p>
                    {shelter.hours ?
                        <div>
                            <p>Hours:</p>
                            <ul>{shelter.hours.map(day => (
                                <li key={day.day}>{day.day}, {day.open} – {day.close}</li>
                            ))}</ul>
                        </div>
                        : ''}
                    {shelter.types ?
                        <div>
                            <p>Guest Types:</p>
                            <ul>{shelter.types.map(type => (
                                <li key={type.type}>{type.capacity} beds for {type.type} guests</li>
                            ))}</ul>
                            <p>Tags:</p>
                        </div>
                        : ''}
                    {shelter.tags ?
                        <div>
                            <ul>{shelter.tags.map(tag => (
                                <li key={tag.tag}>{tag.tag}</li>
                            ))}</ul>
                        </div>
                        : ''}
                    <Button onClick={this.handleBack}>Back</Button>
                    <Button color='green' onClick={this.postShelter}>Submit</Button>
                </div>
            </div>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(UserPortalSignUpSubmit);
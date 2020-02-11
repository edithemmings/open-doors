import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import Header from '../Header/Header'
import swal from 'sweetalert'

class UserPortalSignUpSubmit extends Component {

    postShelter = () => {
        axios.post('/api/shelter/user/new-shelter', this.props.reduxState.signUpForm)
            .then(response => {
                console.log('shelter was posted', response)
                this.props.goHome()
                swal("Success", "Details were added to your shelter", "success");
            }).catch(error => {
                console.log(error)
            })
    }
    handleBack = () => {
        this.props.handleBack()
    }
    render() {
        let shelter = this.props.reduxState.signUpForm 
        return (
            <div>
                {/* <Header
                icon1={'checkmark'}
                icon2={'checkmark'}
                icon3={'checkmark'}
                icon4={'checkmark'}
                value5={'Review'}
                color5={'grey'}
            /> */}
                <div className='summaryPage'>
                    <h3>{shelter.contact ? <span>{shelter.contact.name}, {shelter.contact.id}</span> : "Shelter: "}</h3>
                    <p>{shelter.contact ? <span>{shelter.contact.location}</span> : "Location: "}</p>
                    <p>Phone: {shelter.contact ? <span>{shelter.contact.phone}</span>: ''}</p>
                    <p>URL: {shelter.contact ? <span>{shelter.contact.website}</span>: ''}</p>
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
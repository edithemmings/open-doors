import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Input} from 'semantic-ui-react'
import Axios from 'axios';

class Settings1Contact extends Component {
    state = {}
    handleSubmit = () => {
        console.log(this.state.contact)
        Axios.put('/api/shelter/user/contact', this.state.contact)
        .then(response => {
            console.log(response)
            this.props.dispatch({type: 'GET_USER_SHELTER'})
        }).catch(error => {
            console.log(error)
        })
    }
    handleContactChange = (event, keyName) => {
        this.setState({
            ...this.state,
            contact: {
                ...this.state.contact,
                [keyName]: event.target.value
            }
        })
    }
    render() {
        return (
            <div>
                <label>Shelter Name</label>
                <Input
                    fluid
                    placeholder={'Shelter Name'}
                    value={this.props.shelter.name}
                    onChange={(e) => this.props.handleEdit(e, 'name')}
                />
                <label>Full Street Address</label>
                <Input
                    fluid
                    placeholder={'Full Street Address'}
                    value={this.props.shelter.location}
                    onChange={(e) => this.props.handleEdit(e, 'location')}
                />
                <label>Phone Number</label>
                <Input
                    fluid
                    placeholder={'Phone Number'}
                    value={this.props.shelter.phone}
                    onChange={(e) => this.props.handleEdit(e, 'phone')}
                />
                <label>Website URL</label>
                <Input
                    fluid
                    placeholder={'Website URL'}
                    value={this.props.shelter.website}
                    onChange={(e) => this.props.handleEdit(e, 'website')}
                />

            </div>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(Settings1Contact);
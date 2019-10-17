import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Input} from 'semantic-ui-react'
import Axios from 'axios';

class UserPortalSignUp1 extends Component {
    state = {}
    handleSubmit = () => {
        console.log(this.state.contact)
        Axios.post('/api/shelter/user/contact', this.state.contact)
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
                    onChange={(e) => this.handleContactChange(e, 'name')}
                />
                <label>Full Street Address</label>
                <Input
                    fluid
                    placeholder={'Full Street Address'}
                    onChange={(e) => this.handleContactChange(e, 'address')}
                />
                <label>Phone Number</label>
                <Input
                    fluid
                    placeholder={'Phone Number'}
                    onChange={(e) => this.handleContactChange(e, 'phone')}
                />
                <label>Website URL</label>
                <Input
                    fluid
                    placeholder={'Website URL'}
                    onChange={(e) => this.handleContactChange(e, 'website')}
                />
                <Button onClick={this.handleSubmit}>Next</Button>

            </div>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(UserPortalSignUp1);
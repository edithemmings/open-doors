import React, { Component } from 'react';
import { connect } from "react-redux";
import UserPortalHome from './UserPortalHome/UserPortalHome'
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios'


class ShelterPortalHome extends Component {
    state = {
        shelterIsRegistered: 'waiting'
    }
    componentDidMount() {
        axios.get(`/api/shelter/all/user`)
            .then(response => {
                console.log(response.data[0])
                if (response.data.length > 0) {
                    this.setState({
                        shelter: response.data[0],
                        shelterIsRegistered: true
                    })
                } else {
                    this.setState({
                        ...this.state,
                        shelterIsRegistered: false
                    })
                }
            }).catch(error => {
                this.setState({
                    ...this.state,
                    shelterIsRegistered: false
                })
            })
    }

    componentDidUpdate() {
        if (this.props.reduxState.userShelter && this.state.shelterIsRegistered === false) {
            this.setState({
                shelter: this.props.reduxState.userShelter,
                shelterIsRegistered: true
            })
        }
        if (!this.props.reduxState.userShelter && this.state.shelterIsRegistered === true) {
            this.props.dispatch({ type: 'GET_USER_ALL_SHELTER_INFO' });
        }
    }

    render() {
        return (
            <div>
                {this.state.shelterIsRegistered === true
                    ? <UserPortalHome shelter={this.state.shelter} />
                    : ''
                }
                {this.state.shelterIsRegistered === false
                    ? <div>
                        <h3>Thank you for signing up for Open Doors</h3>
                        <Link to={'/sign-up-1'}>
                            <Button>Register a Shelter</Button>
                        </Link>
                    </div> : ''
                }
                {this.state.shelterIsRegistered === 'waiting'
                    ? <h1>LOADING</h1>
                    : ''
                }
            </div>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterPortalHome);
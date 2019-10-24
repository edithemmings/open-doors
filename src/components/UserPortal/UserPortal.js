import React, { Component } from 'react';
import { connect } from "react-redux";
import UserPortalHome from './UserPortalHome/UserPortalHome'
import { Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class ShelterPortalHome extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_ALL_SHELTER_INFO' });
    }
    render() {
        return (
            <div>
                {this.props.reduxState.userShelter.types
                    ? <UserPortalHome shelter={this.props.reduxState.userShelter} />
                    : <div>
                        <p>Waiting for your info ...</p>
                        <p>Still need to register your shelter?</p>
                        <Link to='/sign-up-1'><Button>Click here!</Button></Link>
                    </div>
                }
                {/* {!this.props.reduxState.userShelter.types 
                    ? <div><SignUp1Contact toPage2={this.toPage2} />
                    </div>
                    : <UserPortalHome shelter={this.props.reduxState.userShelter} />
                } */}
            </div>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterPortalHome);
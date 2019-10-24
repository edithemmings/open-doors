import React, { Component } from 'react';
import { connect } from "react-redux";
import UserPortalHome from './UserPortalHome/UserPortalHome'
import SignUp1Contact from './SignUp/SignUp1Contact/SignUp1Contact'


class ShelterPortalHome extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_ALL_SHELTER_INFO' });
    }
    render() {
        return (
            <div>
                {this.props.reduxState.userShelter.types
                    ? <UserPortalHome shelter={this.props.reduxState.userShelter} />
                    : <h1>LOADING</h1>
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
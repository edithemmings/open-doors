import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import UserPortalHome from './UserPortalHome/UserPortalHome'
import SignUp1Contact from './SignUp1Contact/SignUp1Contact'
import SignUp2Hours from './SignUp2Hours/SignUp2Hours'
import SignUp3Types from './SignUp3Types/SignUp3Types'
import SignUp4Tags from './SignUp4Tags/SignUp4Tags'
import SignUpSubmit from './SignUpSubmit/SignUpSubmit'

import { Button } from 'semantic-ui-react'


class ShelterPortalHome extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_SHELTER' });
    }
    render() {
        return (
            <div>
                {/* {this.props.reduxState.userShelter.length === 1 
                    ? <UserPortalHome /> 
                    :  */}
                    <div><SignUp1Contact /><SignUp2Hours /> <SignUp3Types /> <SignUp4Tags/> <SignUpSubmit /></div>
                {/* } */}
            </div>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterPortalHome);
import React, { Component } from 'react';
import { connect } from "react-redux";
import UserPortalHome from './UserPortalHome/UserPortalHome'
import SignUp1Contact from './SignUp/SignUp1Contact/SignUp1Contact'
import SignUp2Hours from './SignUp/SignUp2Hours/SignUp2Hours'
import SignUp3Types from './SignUp/SignUp3Types/SignUp3Types'
import SignUp4Tags from './SignUp/SignUp4Tags/SignUp4Tags'
import SignUpSubmit from './SignUp/SignUpSubmit/SignUpSubmit'


class ShelterPortalHome extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_SHELTER' });
    }
    render() {
        return (
            <div>
                {this.props.reduxState.userShelter.id
                    ? <UserPortalHome id={this.props.reduxState.userShelter.id}/> 
                    : 
                    <div><SignUp1Contact /><SignUp2Hours /> <SignUp3Types /> <SignUp4Tags/> <SignUpSubmit /></div>
                }
            </div>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterPortalHome);
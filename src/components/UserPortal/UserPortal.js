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
        this.props.dispatch({ type: 'GET_USER_ALL_SHELTER_INFO' });
    }

    toPage2 = () => {
        this.props.history.push('/sign-up-2')
    }
    render() {
        return (
            <div>
                {this.props.reduxState.userShelter.types
                    ? <UserPortalHome shelter={this.props.reduxState.userShelter}/> 
                    : 
                    <div><SignUp1Contact toPage2={this.toPage2}/>
                    {/* <SignUp2Hours /><SignUp3Types /><SignUp4Tags /><SignUpSubmit  /> */}
                    </div>
                    // this.props.history.push('/sign-up-1')
                }
            </div>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterPortalHome);
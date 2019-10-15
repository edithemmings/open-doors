import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import UserPortalHome from './UserPortalHome/UserPortalHome'
import UserPortalSignUp2 from './UserPortalSignUp2/UserPortalSignUp2'
import { Button } from 'semantic-ui-react'


class ShelterPortalHome extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_SHELTER' });
    }
    render() {
        return (
            <div>
                {this.props.reduxState.userShelter.length === 1 
                    ? <UserPortalHome /> 
                    : <UserPortalSignUp2 /> 
                }
            </div>
            // <Router>
            //     <div>
            //         <Switch>
            //             <Route
            //                 exact
            //                 path="/home/userhome"
            //                 component={UserPortalHome}
            //             />
            //             <Route
            //                 exact
            //                 path="/home/signup"
            //                 component={UserPortalSignUp}
            //             />
            //             <Route render={() => <Button loading>Loading</Button>} />
            //         </Switch>
            //     </div>
            // </Router>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterPortalHome);
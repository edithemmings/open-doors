import React, {Component} from 'react';
import { connect } from "react-redux";

class ShelterPortalHome extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_USER_SHELTERS' });
        console.log(this.props.reduxState.shelters)
    }
    render(){
        return (
            <>
              
            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterPortalHome);
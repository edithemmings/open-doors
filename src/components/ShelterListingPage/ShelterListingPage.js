import React, {Component} from 'react';
import { connect } from "react-redux";
import ShelterList from './ShelterList/ShelterList'

class ShelterListing extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_SHELTERS' });
        console.log(this.props.reduxState.shelters, Array.isArray(this.props.reduxState.shelters))
    }
    goToDetailsPage = (id) => {
        this.props.history.push(`/explore/${id}`)
    }
    render(){
        return (
            <>
                <ShelterList 
                    shelters={this.props.reduxState.shelters}
                    goToDetailsPage={this.goToDetailsPage}
                />
                
            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterListing);
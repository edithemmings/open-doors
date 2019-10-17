import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'
import Axios from 'axios';

class ShelterPortalHome extends Component {
    componentDidMount() {
        this.getUserGuestCounts();
    }
    getUserGuestCounts = () => {
        Axios.get(`/api/shelter/user/types/${this.props.id}`)
        .then((response) => {
            this.setState({
                typeCounts: response.data
            })
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        return (
            <>
                <Button primary>up+</Button>
                <Button primary>down-</Button>

            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterPortalHome);
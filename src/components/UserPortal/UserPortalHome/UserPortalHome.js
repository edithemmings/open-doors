import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'

class ShelterPortalHome extends Component {
    
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
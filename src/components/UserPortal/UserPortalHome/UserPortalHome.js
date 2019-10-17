import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'
import Axios from 'axios';

class ShelterPortalHome extends Component {
    state = {}
    componentDidMount() {
        this.getUserGuestCounts();
    }
    componentDidUpdate() {
        console.log(this.state.typeCounts)
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
    handleClick =(id, upOrDown, type) => {
        Axios.put(`/api/shelter/user/${upOrDown}/${id}`, {type: type})
        .then(response => {
            console.log(response)
            this.getUserGuestCounts();
        }).catch(error => {
            console.log(error)
        })
    } 
    render() {
        return (
            <>
            {this.state.typeCounts ? 
                this.state.typeCounts.map(type => (
                    <div>
                        <h2>{type.count}/{type.capacity}</h2>
                        <p>{type.type} guests</p>
                        <Button 
                            key={type.id} 
                            primary
                            onClick={() => this.handleClick(type.id, 'up', type.type)}
                        >up+</Button>
                        <Button 
                            key={type.id} 
                            primary
                            onClick={() => this.handleClick(type.id, 'down', type.type)}
                        >down-</Button>
                    </div>
            )) : ''}
                

            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterPortalHome);
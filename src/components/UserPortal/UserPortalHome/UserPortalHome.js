import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

class ShelterPortalHome extends Component {
    state = {}
    componentDidMount() {
        this.getUserGuestCounts();
    }
    getUserGuestCounts = () => {
        Axios.get(`/api/shelter/user/types/${this.props.shelter.id}`)
        .then((response) => {
            this.setState({
                typeCounts: response.data
            })
            // console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    handleClick =(id, upOrDown, type) => {
        Axios.put(`/api/shelter/user/${upOrDown}/${id}`)
        .then(response => {
            console.log(response)
            this.getUserGuestCounts();
        }).catch(error => {
            console.log(error)
        })
        //axios.put('/api/timestamp')
    } 
    render() {
        return (
            <>
            {this.state.typeCounts ? 
                this.state.typeCounts.map(type => (
                    <div key={type.id}>
                        <h2>{type.count}/{type.capacity}</h2>
                        <p>{type.type} guests</p>
                        <Button  
                            primary
                            onClick={() => this.handleClick(type.id, 'up')}
                        >up+</Button>
                        <Button 
                            primary
                            onClick={() => this.handleClick(type.id, 'down')}
                        >down-</Button>
                    </div>
            )) : ''}
            
                <Link to='/settings'><Button>Settings</Button></Link>


            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterPortalHome);
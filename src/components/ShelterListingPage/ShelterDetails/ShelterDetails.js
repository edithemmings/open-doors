import React, { Component } from 'react';
import { connect } from "react-redux";
import Map from '../../Map/Map'
import axios from 'axios'

class ShelterDetails extends Component {
    state = { googlePlace: {} }
    
    componentDidMount() {
        let location = '';
        this.props.reduxState.shelters.forEach((shelter) => {
            if (shelter.id == this.props.match.params.id) {
                location = shelter.location;
            }
        })
        this.getSelection(location)
    }

    getSelection = (location) => {
        let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyCsBnZcbDFpKB4Y5uYIN6Xvsr9N8U2hq7s&fields=photos,formatted_address,name,rating,opening_hours,geometry&inputtype=textquery&input=${location}`
        let proxy = "https://cors-anywhere.herokuapp.com/"
        axios({
            method: 'GET',
            url: proxy + url,
            proxyurl: proxy
        })
            .then((response) => {
                console.log(location, response.data)
                this.setState({
                    ...this.state,
                    googlePlace: response.data.candidates[0]
                })
            }).catch(error => {
                console.log('error finding place: ', error)
            })
    }
    render() {
        return (
            <>
                {Array.isArray(this.props.reduxState.shelters) ?
                    <div className='listingCard' onClick={this.goToDetailsPage}>
                        {this.props.reduxState.shelters.map((shelter) => {
                            if (shelter.id == this.props.match.params.id) {
                                return <div key={shelter.id}>
                                    <h3>{shelter.name}</h3>
                                    <p>{shelter.location}</p>
                                    <p>{shelter.phone}</p>
                                    <p>{shelter.website}</p>
                                    <ul>
                                        {shelter.tags.map(tag => {
                                            return <li>{tag}</li>
                                        })}
                                    </ul>
                                    <ul>
                                        {shelter.types.map(type => {
                                            return <li>{type.type}, {type.count}/{type.capacity}</li>
                                        })}
                                    </ul>
                                    {this.state.googlePlace ?
                                        <Map
                                            coords={this.state.googlePlace.geometry}
                                            name={shelter.name}
                                        />
                                        : ''}
                                </div>
                            }
                        })}</div>
                    : 'error, try refreshing'}
            </>
        )
    }
}

const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterDetails);

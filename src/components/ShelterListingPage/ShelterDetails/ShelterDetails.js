import React, { Component } from 'react';
import { connect } from "react-redux";
import Map from '../../Map/Map'
import axios from 'axios'
import Nav from '../../Nav/Nav'

class ShelterDetails extends Component {
    state = { googlePlace: {}, loading: true }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_SHELTERS' });
    }
    componentDidUpdate() {
        if (this.state.loading && this.props.reduxState.shelters) {
            let location = '';
            this.props.reduxState.shelters.forEach((shelter) => {
                if (shelter.id == this.props.match.params.id) {
                    location = shelter.location;
                }
            })
            this.getShelterCoordinates(location)
            this.setState({ ...this.state, loading: false })
        }
    }

    getShelterCoordinates = (location) => {
        // let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.REACT_APP_API_KEY}&fields=photos,formatted_address,name,rating,opening_hours,geometry&inputtype=textquery&input=${location}`
        // let proxy = "https://cors-anywhere.herokuapp.com/"
        // axios({
        //     method: 'GET',
        //     url: proxy + url,
        //     proxyurl: proxy
        // })
        //     .then((response) => {
        //         console.log(location, response.data)
        //         this.setState({
        //             ...this.state,
        //             googlePlace: response.data.candidates[0]
        //         })
        //     }).catch(error => {
        //         console.log('error finding place: ', error)
        //     })
    }
    render() {
        return (
            <>
                <Nav />
                {Array.isArray(this.props.reduxState.shelters) ?
                    <div className='detailsPage' onClick={this.goToDetailsPage}>
                        {this.props.reduxState.shelters.map((shelter) => {
                            if (shelter.id == this.props.match.params.id) {
                                return <div key={shelter.id}>
                                    <h3 className='detailsName'>{shelter.name}</h3>
                                    <div className='detailsDetails'>
                                        <p>{shelter.location}</p>
                                        <p>{shelter.phone}</p>
                                        <p><a href={shelter.website}>{shelter.website}</a></p>
                                    
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
                                    </div>
                                    {/* {this.state.googlePlace ?
                                        <Map
                                            coords={this.state.googlePlace.geometry}
                                            name={shelter.name}
                                        />
                                        : ''} */}
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

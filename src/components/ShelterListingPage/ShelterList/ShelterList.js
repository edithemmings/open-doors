import React, { Component } from 'react';
import ListCard from '../ListCard/ListCard'
import axios from 'axios'
import { Facebook } from 'react-content-loader'
import { Card } from 'semantic-ui-react'

class ShelterList extends Component {
    state = {
        distances: [],
        loadingDistances: true
    }
    subtractDate = (date) => {
        // console.log(date.replace(/-/g, '/').replace(/T/g, ' '), new Date())
        let difInMillis = Math.abs(new Date() - new Date(date.replace(/-/g, '/').replace(/T/g, ' ')))
        let difInMinutes = Math.floor((difInMillis / 1000) / 60);
        let difInHours = Math.floor((difInMinutes) / 60);
        let difInDays = Math.floor((difInHours) / 24);
        // console.log(difInMinutes, difInHours, difInDays)
        if (difInDays > 1) {
            return difInDays + ' days';
        } else if (difInDays === 1) {
            return '1 day';
        } else if (difInHours > 1) {
            return difInHours + ' hours';
        } else if (difInHours === 1) {
            return '1 hour';
        } else if (difInMinutes === 1) {
            return '1 min';
        } else {
            return difInMinutes + ' mins';
        }

    }

    componentDidUpdate() {
        if (this.state.loadingDistances === true && this.props.shelters) {
            this.loopSheltersSetState();
            this.getMyCoords();
            this.setState({
                ...this.state,
                loadingDistances: false
            })
        }
    }

    loopSheltersSetState = () => {
        this.props.shelters.forEach(shelter => {
            this.getShelterCoordinates(shelter.id, shelter.location)
        })
    }
    calculateDistance = (myLocation, shelterLocation) => {
        console.log('mine: ', myLocation, 'shelter: ', shelterLocation)
        const lat1 = myLocation.lat || '';
        const lon1 = myLocation.lng || '';
        const lat2 = shelterLocation.lat || '';
        const lon2 = shelterLocation.lng || '';

        if (!lat1 || !lon1 || !lat2 || !lon2) {
            return '--';
        }
        //calculate distance distance between two points with latitudet and longitude
        const radlat1 = Math.PI * lat1 / 180
        const radlat2 = Math.PI * lat2 / 180
        const theta = lon1 - lon2
        const radtheta = Math.PI * theta / 180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515;
        // if (unit === "K") { dist = dist * 1.609344 }
        // if (unit === "N") { dist = dist * 0.8684 }
        return dist.toFixed(2)
    }
    getMyCoords = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                this.setState({
                    ...this.state,
                    geolocation: pos
                })
            }, function () {
                console.log('nope1')
            });
        } else {
            // Browser doesn't support Geolocation	
            console.log('nope2')
        }
    }
    getShelterCoordinates = (id, location) => {
        // let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.REACT_APP_API_KEY}&fields=photos,formatted_address,name,rating,opening_hours,geometry&inputtype=textquery&input=${location}`
        // let proxy = "https://cors-anywhere.herokuapp.com/"
        // axios({
        //     method: 'GET',
        //     url: proxy + url,
        //     proxyurl: proxy
        // })
        //     .then((response) => {
        //         console.log(location, response.data)
        //         let coords = response.data.candidates[0];
        //         this.setState({
        //             ...this.state,
        //             distances: [
        //                 ...this.state.distances,
        //                 {
        //                     id: id,
        //                     coords: coords.geometry.location
        //                 }
        //             ]
        //         })
        //         console.log(this.state.distances)
        //     }).catch(error => {
        //         console.log('error finding place: ', error)
        //     })

    }

    render() {
        return (
            <>
                {this.props.shelters && (this.state.loadingDistances === false) && this.state.distances && this.state.geolocation ?
                    <div className='cardGroup'><Card.Group centered>
                        {this.props.shelters.map((shelter) => {
                            let shelterCoords = {};
                            this.state.distances.forEach(distance => {
                                if (distance.id == shelter.id) {
                                    shelterCoords = distance.coords
                                }
                            })
                            console.log(shelterCoords, this.state.geolocation, 'DOMDOMDOM')
                            const distance = this.calculateDistance(shelterCoords, this.state.geolocation);
                            console.log(distance)
                            return <div key={shelter.id} className='listingCard' value={shelter.id} onClick={() => this.props.goToDetailsPage(shelter.id)}>
                                <ListCard
                                    shelter={shelter}
                                    subtractDate={this.subtractDate}
                                    distance={distance}
                                />
                            </div>
                        })}
                    </Card.Group></div>
                    : <div className='explore-loaders'><Facebook className='explore-loader' /><Facebook className='explore-loader' /><Facebook className='explore-loader' /><Facebook className='explore-loader' /></div>}
            </>
        )
    }
}


export default ShelterList;
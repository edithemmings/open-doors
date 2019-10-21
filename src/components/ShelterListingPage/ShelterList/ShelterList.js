import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'
import axios from 'axios'
class ShelterList extends Component {
    componentDidMount() {
        this.getShelterCoordinates('2100 Pillsbury Ave S, Minneapolis, MN');
    }
    calculateDistance = (myLocation, shelterLocation) => {
        console.log('mine: ', myLocation, 'shelter: ', shelterLocation)
        var service = new window.google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
            origins: [myLocation],
            destinations: [shelterLocation],
            travelMode: 'WALKING',
            unitSystem: window.google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            if (status !== 'OK') {
                alert('Error was: ' + status);
            } else {
                var originList = response.originAddresses;
                var destinationList = response.destinationAddresses;
                console.log('results from distance calc', originList, destinationList)
            }
        })
    }
    getMyCoords = (shelterCoords) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                this.calculateDistance(pos, shelterCoords)
            }, function () {
                console.log('nope1')
            });
        } else {
            // Browser doesn't support Geolocation
            console.log('nope2')
        }
    }
    getShelterCoordinates = (location) => {
        let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${KEY}&fields=photos,formatted_address,name,rating,opening_hours,geometry&inputtype=textquery&input=${location}`
        let proxy = "https://cors-anywhere.herokuapp.com/"
        axios({
            method: 'GET',
            url: proxy + url,
            proxyurl: proxy
        })
            .then((response) => {
                console.log(location, response.data)
                let coords = response.data.candidates[0];
                this.getMyCoords(coords.geometry.location)
            }).catch(error => {
                console.log('error finding place: ', error)
            })
    }
    render() {
        return (
            <>
                {Array.isArray(this.props.shelters) ?
                    <div>
                        {this.props.shelters.map((shelter) => {
                            return <div key={shelter.id} className='listingCard' value={shelter.id} onClick={() => this.props.goToDetailsPage(shelter.id)}>
                                <Card.Group centered>
                                    <Card>
                                        <Card.Content>
                                            <Card.Header>
                                                <Card.Header>{shelter.name}</Card.Header>
                                            </Card.Header>
                                        </Card.Content>
                                        <Card.Content>
                                            <ul>
                                                {shelter.types.map(type => {
                                                    return <li>{type.type}, {type.count}/{type.capacity}</li>
                                                })}
                                            </ul>
                                        </Card.Content>
                                        <Card.Content>
                                            <Button value={shelter.phone}>Call</Button>
                                        </Card.Content>
                                    </Card>
                                </Card.Group>
                            </div>
                        })}
                    </div>
                    : ''}
            </>
        )
    }
}


export default ShelterList;
import React, { Component } from 'react';
import { connect } from "react-redux";
import Map from '../../Map/Map'
import axios from 'axios'
import Nav from '../../Nav/Nav'
import classNames from 'classnames'
import { Icon } from 'semantic-ui-react'

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
                    <div onClick={this.goToDetailsPage}>
                        {this.props.reduxState.shelters.map((shelter) => {
                            if (shelter.id == this.props.match.params.id) {
                                return <div className='detailsPage' key={shelter.id}>
                                    <div className='detailsDetails'>
                                        <h3 className='detailsName'>{shelter.name}</h3>
                                        <p><Icon name='phone' /> {shelter.phone}</p>
                                        <p><Icon name='map pin' />
                                            <a href={`https://www.google.com/maps/search/${shelter.location}`}> 
                                        {shelter.location}
                                        </a></p>
                                        <p><a href={shelter.website}>{shelter.website}</a></p>
                                        <ul className='detailsUL'>
                                            {shelter.types.map(type => {
                                                return <li className='type'>
                                                    {type.capacity ? <span className={classNames({
                                                        'availability': true,
                                                        'redStatus': (type.capacity - type.count) === 0,
                                                        'yellowStatus': (type.capacity - type.count) <= 5 && (type.capacity - type.count) > 0,
                                                        'greenStatus': (type.capacity - type.count) > 5,
                                                    })}>
                                                        <span className='count'>{type.capacity - type.count}</span>
                                                        <span className='capacity'> beds available</span>
                                                    </span>
                                                        : '--  '}
                                                    <span className='typeName'>for {type.type} guests ({type.capacity} total)</span>
                                                </li>
                                            })}
                                            <li className='type tags'><Icon name='hashtag' />Shelter Tags</li>
                                            <li className='type'><ul>
                                                {shelter.tags.map(tag => {
                                                    return <li className='detailsTags'>{tag}</li>
                                                })}
                                            </ul></li>
                                        </ul>
                                       
                                    </div>
                                    <div className='googleMap'>
                                    {this.state.googlePlace ?
                                        <Map
                                            coords={this.state.googlePlace.geometry}
                                            name={shelter.name}
                                        />
                                        : 'Loading Map'}
                                    </div>
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

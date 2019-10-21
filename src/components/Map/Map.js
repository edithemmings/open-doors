import React from 'react';

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=place&key=${process.env.REACT_APP_API_KEY}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>

    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 44.952228, lng: -93.2791737 }}
    >
        {props.coords ?
        // {true  ?
            <Marker 
                position={{ lat: props.coords.location.lat, lng: props.coords.location.lng }}
                // position={{ lat: 44.952228, lng: -93.2791737}}
                label={props.name}
                labelAnchor={new window.google.maps.Point(0, 0)}
                labelStyle={{ backgroundColor: "yellow", fontSize: "14px", padding: "16px" }}
            >
            </Marker > 
        : ''}
    </GoogleMap>
)


export default MyMapComponent;

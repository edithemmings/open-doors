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
)((props) => {
    let coords = { lat: 44.952228, lng: -93.2791737 }
    if (props.coords){
        coords = { lat: props.coords.location.lat, lng: props.coords.location.lng }
    }
    return <GoogleMap
        defaultZoom={14}
        defaultCenter={coords}
    >
        {props.coords ?
        // {true  ?
            <Marker 
                position={{ lat: props.coords.location.lat, lng: props.coords.location.lng }}
                label={props.name}
                labelAnchor={new window.google.maps.Point(0, 0)}
                labelStyle={{ backgroundColor: "yellow", fontSize: "14px", padding: "16px" }}
            >
            </Marker > 
        : ''}
    </GoogleMap>
}
)


export default MyMapComponent;

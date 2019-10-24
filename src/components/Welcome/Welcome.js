import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to Open Doors</h1>
                <Link to='/explore'><Button primary>Find a Shelter</Button>
                </Link>
                <Link to='/home'><Button secondary>Shelter Portal</Button>
                </Link>

            </div>
        )
    }
}

export default Welcome;
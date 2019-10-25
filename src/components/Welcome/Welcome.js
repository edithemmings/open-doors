import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Welcome.css'

class Welcome extends Component {
    render() {
        return (
            <div className='Welcome'>
                <div className='purple'>
                    <h1>Welcome to<span className='welcomeTo'>Open Doors</span></h1>
                    <div className='exploreBtn'>
                        <Link to='/explore'><Button size='massive'>Find a Shelter</Button>
                        </Link>
                    </div>
                    <div className='homeBtn'>
                        <Link to='/home'><Button inverted compact>Shelter Portal</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome;
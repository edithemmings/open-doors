import React, { Component } from 'react';
import { Input} from 'semantic-ui-react'

class Settings1Contact extends Component {  
    render() {
        return (
            <div className='contactSettings'>
                <label>Shelter Name</label>
                <Input
                    fluid
                    placeholder={'Shelter Name'}
                    value={this.props.shelter.name}
                    onChange={(e) => this.props.handleEdit(e, 'name')}
                />
                <label>Full Street Address</label>
                <Input
                    fluid
                    placeholder={'Full Street Address'}
                    value={this.props.shelter.location}
                    onChange={(e) => this.props.handleEdit(e, 'location')}
                />
                <label>Phone Number</label>
                <Input
                    fluid
                    label='+ 1' 
                    placeholder={'Phone Number'}
                    value={this.props.shelter.phone}
                    onChange={(e) => this.props.handleEdit(e, 'phone')}
                />
                <label>Website URL</label>
                <Input
                    fluid
                    label='http://' 
                    placeholder={'Website URL'}
                    value={this.props.shelter.website}
                    onChange={(e) => this.props.handleEdit(e, 'website')}
                />

            </div>
        )
    }
}

export default Settings1Contact;
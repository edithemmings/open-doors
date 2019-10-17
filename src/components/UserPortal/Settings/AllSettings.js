import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'
import Settings1Contact from '../Settings/Settings1Contact/Settings1Contact'
import Settings2Hours from '../Settings/Settings2Hours/Settings2Hours'
import Settings3Types from '../Settings/Settings3Types/Settings3Types'
import Settings4Tags from '../Settings/Settings4Tags/Settings4Tags'


class AllSettings extends Component {
    state = {
        contact: {
            name: this.props.reduxState.userShelter.name,
            location: this.props.reduxState.userShelter.location,
            phone: this.props.reduxState.userShelter.phone,
            website: this.props.reduxState.userShelter.website
        },
        moreInfo: {
            id: this.props.reduxState.userShelter.id,
            types: this.props.reduxState.userShelter.types,
            hours: this.props.reduxState.userShelter.hours,
            tags: this.props.reduxState.userShelter.tags,
        }
    }
    handleSave = () => {
        const oldName = this.props.reduxState.userShelter.name;
        const oldLocation = this.props.reduxState.userShelter.location;
        const oldPhone = this.props.reduxState.userShelter.phone;
        const oldWebsite = this.props.reduxState.userShelter.website
        const id = this.props.reduxState.userShelter.id;
        const oldTypes = this.props.reduxState.userShelter.types;
        const oldHours = this.props.reduxState.userShelter.hours;
        const oldTags = this.props.reduxState.userShelter.tags;
        // deciding whether to update the contact info
        if (
            oldName !== this.state.contact.name ||
            oldLocation!== this.state.contact.location ||
            oldPhone !== this.state.contact.phone ||
            oldWebsite !== this.state.contact.website
        ){
            console.log('...updating your contact info...')
            // axios.put('/api/shelter/user/contact', {this.state.contact})
        }
        newTypes = []
        oldTypes.forEach(oldType => {
            this.state.contact.forEach(stateType => {
                if (oldType.id === stateType.id){
                    newTypes.push(stateType);
                }
            });
        });

    }
    handleEditContact = (event, keyName) => {
        this.setState({
            shelter: {
                ...this.state.contact,
                [keyName]: event.target.value
            }
        })
    }
    handleEditMoreInfo = (keyName, data) => {
        this.setState({
            moreInfo: {
                ...this.state.moreInfo,
                [keyName]: data
            }
        })
    }
    componentDidMount() {
        // console.log(this.state)
        console.log(this.props.reduxState.userShelter)
        // console.log(this.props.reduxState.userShelter.hours)
    }
    render() {
        return (
            <>
                <div>
                    <Settings1Contact
                        shelter={this.state.contact}
                        handleEdit={this.handleEditContact}
                    />
                    <Settings2Hours
                        shelter={this.state.moreInfo}
                        handleEdit={this.handleEditMoreInfo}
                    />
                    <Settings3Types
                        shelter={this.state.moreInfo}
                        handleEdit={this.handleEditMoreInfo}
                    />
                    {/* <Settings4Tags
                        shelter={this.state.moreInfo}
                        handleEdit={this.handleEditMoreInfo}
                    /> */}
                    <Button onClick={this.handleSave}>Save</Button>
                </div>

            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(AllSettings);
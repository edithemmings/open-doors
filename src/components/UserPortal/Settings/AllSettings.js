import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react'
import Settings1Contact from '../Settings/Settings1Contact/Settings1Contact'
import Settings2Hours from '../Settings/Settings2Hours/Settings2Hours'
import Settings3Types from '../Settings/Settings3Types/Settings3Types'
import Settings4Tags from '../Settings/Settings4Tags/Settings4Tags'
import Axios from 'axios';
import Nav from '../../Nav/Nav';
import './Settings.css'
import swal from 'sweetalert'


class AllSettings extends Component {
    componentDidMount() {
        Axios.get(`/api/shelter/all/user`)
            .then(response => {
                console.log(response.data);
                let shelter = response.data[0];
                this.setState({
                    contact: {
                        name: shelter.name,
                        location: shelter.location,
                        phone: shelter.phone,
                        website: shelter.website
                    },
                    moreInfo: {
                        id: shelter.id,
                        types: this.formatTypesToShow(shelter.type_names, shelter.types),
                        hours: shelter.hours,
                        tags: shelter.tags,
                    }
                })
            }).catch(error => { console.log(error) })
        this.props.dispatch({ type: 'GET_USER_ALL_SHELTER_INFO' });

    }
    handleEditContact = (event, keyName) => {
        this.setState({
            contact: {
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

    createListOfItemsToUpdate = (keyName, data, editType) => {
        if (this.state[keyName] && this.state[keyName][editType]) {
            this.setState({
                [keyName]: {
                    ...this.state[keyName],
                    [editType]: [...this.state[keyName][editType], data]
                }
            })
        } else {
            this.setState({
                [keyName]: {
                    ...this.state[keyName],
                    [editType]: [data]
                }
            })
        }
    }

    handleSave = () => {
        // declaring some variables
        const contactDidChange = this.contactDidChange();
        const hoursDidChange = this.state.hours || false;
        const shelterId = this.state.moreInfo.id;
        let typesDidChange = false;
        let tagsDidChange = false;
        if (this.state.types) {
            typesDidChange = {
                delete: this.formatObjToSend(this.state.types.delete, 'type') || [],
                post: this.formatObjToSend(this.state.types.post, 'type') || []
            }
        }
        if (this.state.tags) {
            tagsDidChange = {
                delete: this.formatObjToSend(this.state.tags.delete, 'tag') || [],
                post: this.formatObjToSend(this.state.tags.post, 'tag') || []
            }
        }

        console.log('contact', contactDidChange, 'hours', hoursDidChange, 'types', typesDidChange, 'tags', tagsDidChange)
        //if datasets were changed, 
        if (contactDidChange) {
            Axios.put('api/settings', contactDidChange)
                .then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
        }
        if (typesDidChange || hoursDidChange || tagsDidChange) {
            console.log('editing', { id: shelterId, types: typesDidChange, hours: hoursDidChange, tags: tagsDidChange })
            Axios.post('/api/settings/post', { id: shelterId, types: typesDidChange, hours: hoursDidChange, tags: tagsDidChange })
                .then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
            Axios.post('/api/settings/delete', { id: shelterId, types: typesDidChange, hours: hoursDidChange, tags: tagsDidChange })
                .then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
        }
        this.props.history.push('/home')
    }

    handleDeleteShelter = () => {
        swal({
            title: "Are you sure?",
            text: "This cannot be undone",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.delete(`/api/settings/delete/${this.props.reduxState.userShelter.id}`)
                        .then(response => {
                            console.log(response)
                            this.props.history.push('/home')
                            swal("Your shelter was deleted", {
                                icon: "success",
                            });
                        }).catch(error => {
                            console.log(error)
                            swal("Error deleting shelter");
                        })
                } else {
                    swal("Your shelter is safe!");
                }
            });

    }
    contactDidChange = () => {
        // naming some variables :)
        const oldName = this.props.reduxState.userShelter.name;
        const oldLocation = this.props.reduxState.userShelter.location;
        const oldPhone = this.props.reduxState.userShelter.phone;
        const oldWebsite = this.props.reduxState.userShelter.website
        // checking if anything changed
        // if it did change, it returns all fields
        // if not, returns false
        if (
            oldName !== this.state.contact.name ||
            oldLocation !== this.state.contact.location ||
            oldPhone !== this.state.contact.phone ||
            oldWebsite !== this.state.contact.website
        ) {
            return {
                name: this.state.contact.name,
                location: this.state.contact.location,
                phone: this.state.contact.phone,
                website: this.state.contact.website
            };
        } else {
            return false;
        }
    }// end contactDidChange



    // turns types IDs into their names for display on the dom
    formatTypesToShow = (type_names, types) => {
        let typesToSend = [];
        types.forEach(type => {
            type_names.forEach(typeName => {
                if (type.type_id == typeName.id) {
                    typesToSend = [...typesToSend, {
                        type: typeName.type,
                        id: type.type_id,
                        capacity: type.capacity
                    }]
                }
            })
        })
        return typesToSend;
    }
    //turns type names into IDs for posting to database
    formatObjToSend = (obj, keyToCheck) => {
        if (obj) {
            const arrayToSend = []
            obj.forEach(obj => {
                this.props.reduxState[keyToCheck + 's'].forEach(item => {
                    //if it's a type, then push an object to the array
                    if (keyToCheck == 'type' && obj.type == item.type) {
                        arrayToSend.push({
                            type_id: item.id,
                            capacity: obj.capacity
                        })
                        //if its a tag, push only the ID to the array
                    } else if (keyToCheck == 'tag' && obj.tag == item.tag) {
                        arrayToSend.push(item.id)
                    }
                })
            })
            console.log('ARRAY TO SEND FROM', keyToCheck, arrayToSend)
            return arrayToSend;
        } else {
            return false;
        }
    }

    render() {
        return (
            <>
                <Nav />
                {this.state ?
                    <div className='settingsContainer'>
                        {/* <h2 className='settingsTitle'>Settings</h2> */}
                        <label className='settingsLabel'>Contact Information</label>
                        <Settings1Contact
                            shelter={this.state.contact}
                            handleEdit={this.handleEditContact}
                        />
                        <label className='settingsLabel'>Hours of Operation</label>
                        <Settings2Hours
                            shelter={this.state.moreInfo}
                            handleEdit={this.handleEditMoreInfo}
                            update={this.createListOfItemsToUpdate}
                        />
                        <label className='settingsLabel'>Guests Received</label>
                        <Settings3Types
                            shelter={this.state.moreInfo}
                            handleEdit={this.handleEditMoreInfo}
                            update={this.createListOfItemsToUpdate}
                        />
                        <label className='settingsLabel'>Amenities and Policy</label>
                        <Settings4Tags
                            shelter={this.state.moreInfo}
                            handleEdit={this.handleEditMoreInfo}
                            update={this.createListOfItemsToUpdate}
                        />
                        <div className='settingsBtns'>
                            <Button primary onClick={this.handleSave}>Save</Button> <br />
                            <Button color='red' onClick={this.handleDeleteShelter}>Delete</Button>
                        </div>

                    </div>
                    : <h1>LOADING</h1>}
            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(AllSettings);


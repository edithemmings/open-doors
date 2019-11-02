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
                        types: this.formatTypes(shelter.type_names, shelter.types),
                        hours: shelter.hours,
                        tags: shelter.tags,
                    }
                })
            }).catch(error => {console.log(error)})
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
    handleSave = () => {
        // declaring some variables
        const contactDidChange = this.contactDidChange();
        const typesDidChange = this.arrayOfObjDidChange(this.props.reduxState.userShelter.types, this.state.moreInfo.types, 'type');
        const hoursDidChange = this.arrayOfObjDidChange(this.props.reduxState.userShelter.hours, this.state.moreInfo.hours, 'day');
        const tagsDidChange = this.arrayOfStringsDidChange(this.props.reduxState.userShelter.tags, this.state.moreInfo.tags);
        const shelterId = this.state.moreInfo.id;

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

        console.log('contact changed?', contactDidChange)//returns true or false
        console.log('types changed?', typesDidChange)//returns false, or arrays of things to delete/post
        console.log('hours changed?', hoursDidChange)//returns false, or arrays of things to delete/post
        console.log('tags changed?', tagsDidChange)//returns false, or arrays of things to delete/post
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
    arrayOfObjDidChange = (oldArray, newArray, keyToCheck) => {
        let unchanged = [];
        //checks for what objects were left unedited and stores them
        oldArray.forEach(oldObj => {
            newArray.forEach(newObj => {
                if (oldObj[keyToCheck] === newObj[keyToCheck]) {
                    unchanged.push(newObj);
                }
            });
        });
        //if no changes, returns false, if there are changes, it returns the 
        //objects that need to be deleted or posted
        if (unchanged.length === oldArray.length && unchanged.length === newArray.length) {
            return false;
        } else {
            return {
                delete: this.objectsToDelete(oldArray, unchanged, keyToCheck),
                post: this.objectsToPost(newArray, unchanged, keyToCheck)
            };
        }
    } //end arrayOfObjDidChange
    arrayOfStringsDidChange = (oldArray, newArray) => {
        let unchanged = [];
        //checks for what strings were left unedited and stores them
        oldArray.forEach(oldString => {
            newArray.forEach(newString => {
                if (oldString === newString) {
                    unchanged.push(newString);
                }
            });
        });
        //if no changes, returns false, if there are changes, it returns the
        //strings that need to be deleted or posted
        if (unchanged.length === oldArray.length && unchanged.length === newArray.length) {
            return false;
        } else {
            return {
                delete: this.stringsToDelete(oldArray, unchanged),
                post: this.stringsToPost(newArray, unchanged)
            };
        }
    } //end arrayOfStringsDidChange
    objectsToDelete = (oldArray, unchanged, keyToCheck) => {
        //splices unedited items from the old array, which
        //leaves behind only items that the user deleted from the state
        //returns a list of the user's deleted items
        let toDelete = [...oldArray];
        oldArray.forEach(oldObj => {
            unchanged.forEach(unchangedObj => {
                if (oldObj[keyToCheck] === unchangedObj[keyToCheck]) {
                    toDelete.splice(toDelete.indexOf(oldObj), 1)
                }
            });
        });
        return toDelete;
    } //end objectsToDelete
    stringsToDelete = (oldArray, unchanged) => {
        //splices unedited items from the old array, which
        //leaves behind only items that the user deleted from the state
        //returns a list of the user's deleted items
        let toDelete = [...oldArray];
        oldArray.forEach(oldString => {
            unchanged.forEach(unchangedString => {
                if (oldString === unchangedString) {
                    toDelete.splice(toDelete.indexOf(oldString), 1)
                }
            });
        });
        return toDelete;
    } //end stringsToDelete
    objectsToPost = (newArray, unchanged, keyToCheck) => {
        //splices unedited items from the new array, which
        //leaves behind only items that the user has added to state
        //returns a list of the user's added items
        let toPost = [...newArray];
        newArray.forEach(newObj => {
            unchanged.forEach(unchangedObj => {
                if (newObj[keyToCheck] === unchangedObj[keyToCheck]) {
                    toPost.splice(toPost.indexOf(newObj), 1)
                }
            });
        });
        return toPost;
    } //end objectsToPost
    stringsToPost = (newArray, unchanged) => {
        //splices unedited items from the new array, which
        //leaves behind only items that the user has added to state
        //returns a list of the user's added items
        let toPost = [...newArray];
        newArray.forEach(newString => {
            unchanged.forEach(unchangedString => {
                if (newString === unchangedString) {
                    toPost.splice(toPost.indexOf(newString), 1)
                }
            });
        });
        return toPost;
    } //end stringsToPost
    formatTypes = (type_names, types) => {
        let typesToSend = [];
        types.forEach(type => {
            type_names.forEach(typeName => {
                if (type.type_id == typeName.id){
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
                        />
                        <label className='settingsLabel'>Guests Received</label>
                        <Settings3Types
                            shelter={this.state.moreInfo}
                            handleEdit={this.handleEditMoreInfo}
                        />
                        <label className='settingsLabel'>Amenities and Policy</label>
                        <Settings4Tags
                            shelter={this.state.moreInfo}
                            handleEdit={this.handleEditMoreInfo}
                        />
                        <div className='settingsBtns'>
                        <Button primary onClick={this.handleSave}>Save</Button> <br/>
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
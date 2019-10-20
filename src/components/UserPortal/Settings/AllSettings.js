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
        // console.log(this.props.reduxState.userShelter)
        // console.log(this.props.reduxState.userShelter.hours)
        // this.typesDidChange();
    }
    handleSave = () => {
        console.log('contact changed?', this.contactDidChange())//returns true or false
        console.log('types changed?', this.arrayOfObjDidChange(this.props.reduxState.userShelter.types, this.state.moreInfo.types, 'type'))//returns false, or arrays of things to delete/post
        console.log('hours changed?', this.arrayOfObjDidChange(this.props.reduxState.userShelter.hours, this.state.moreInfo.hours, 'day'))//returns false, or arrays of things to delete/post
        console.log('tags changed?', this.arrayOfStringsDidChange(this.props.reduxState.userShelter.tags, this.state.moreInfo.tags))//returns false, or arrays of things to delete/post
    
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
        if (unchanged.length === oldArray.length) {
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
        if (unchanged.length === oldArray.length) {
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
                    <Settings4Tags
                        shelter={this.state.moreInfo}
                        handleEdit={this.handleEditMoreInfo}
                    />
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
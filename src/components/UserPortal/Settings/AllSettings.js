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
    arrayOfObjDidChange = (oldArray, newArray, keyToCheck) => {
        let unchanged = [];
        oldArray.forEach(oldObj => { // generates a list of Types that are shared between the database and the local state
            newArray.forEach(newObj => {
                if (oldObj[keyToCheck] === newObj[keyToCheck]) {
                    unchanged.push(newObj);
                }
            });
        });
        if (unchanged.length === oldArray.length) {
            return false;
        } else {
            return {
                delete: this.objectsToDelete(oldArray, unchanged, keyToCheck),
                post: this.objectsToPost(newArray, unchanged, keyToCheck)
            };
        }
    }
    arrayOfStringsDidChange = (oldArray, newArray) => {
        let unchanged = [];
        oldArray.forEach(oldString => { // generates a list of Types that are shared between the database and the local state
            newArray.forEach(newString => {
                if (oldString === newString) {
                    unchanged.push(newString);
                }
            });
        });
        if (unchanged.length === oldArray.length) {
            return false;
        } else {
            return {
                delete: this.stringsToDelete(oldArray, unchanged),
                post: this.stringsToPost(newArray, unchanged)
            };
        }
    }
    objectsToDelete = (oldArray, unchanged, keyToCheck) => {
        let toDelete = [...oldArray];
        oldArray.forEach(oldObj => { 
            unchanged.forEach(unchangedObj => {
                if (oldObj[keyToCheck] === unchangedObj[keyToCheck]) {
                    toDelete.splice(toDelete.indexOf(oldObj), 1)
                }
            });
        });
        return toDelete;
    }
    stringsToDelete = (oldArray, unchanged) => {
        let toDelete = [...oldArray];
        oldArray.forEach(oldString => {
            unchanged.forEach(unchangedString => {
                if (oldString === unchangedString) {
                    toDelete.splice(toDelete.indexOf(oldString), 1)
                }
            });
        });
        return toDelete;
    }
    objectsToPost = (newArray, unchanged, keyToCheck) => {
        let toPost = [...newArray];
        newArray.forEach(newObj => {
            unchanged.forEach(unchangedObj => {
                if (newObj[keyToCheck] === unchangedObj[keyToCheck]) {
                    toPost.splice(toPost.indexOf(newObj), 1)
                }
            });
        });
        return toPost;
    }
    stringsToPost = (newArray, unchanged) => {
        let toPost = [...newArray];
        newArray.forEach(newString => {
            unchanged.forEach(unchangedString => {
                if (newString === unchangedString) {
                    toPost.splice(toPost.indexOf(newString), 1)
                }
            });
        });
        return toPost;
    }
    contactDidChange = () => {
        // determines whether the shelter contact info was edited in settings
        const oldName = this.props.reduxState.userShelter.name;
        const oldLocation = this.props.reduxState.userShelter.location;
        const oldPhone = this.props.reduxState.userShelter.phone;
        const oldWebsite = this.props.reduxState.userShelter.website
        if (
            oldName !== this.state.contact.name ||
            oldLocation !== this.state.contact.location ||
            oldPhone !== this.state.contact.phone ||
            oldWebsite !== this.state.contact.website
        ) {
            return {
                name : this.state.contact.name,
                location : this.state.contact.location,
                phone : this.state.contact.phone,
                website : this.state.contact.website
            };
        } else {
            return false;
        }
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
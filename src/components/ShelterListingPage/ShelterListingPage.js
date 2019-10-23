import React, { Component } from 'react';
import { connect } from "react-redux";
import ShelterList from './ShelterList/ShelterList'
import Search from '../ShelterListingPage/Search/Search'


class ShelterListing extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_SHELTERS' });
        console.log(this.props.reduxState.shelters, Array.isArray(this.props.reduxState.shelters))
    }
    goToDetailsPage = (id) => {
        this.props.history.push(`/explore/${id}`)
    }
    filterSearchResults = (allTags, allTypes, formTags, formTypes) => {
        let selectedTags =[];
        let selectedTypes = [];

        if (allTags && formTags) {
            allTags.forEach(tagObj => {
                if (formTags['id' + tagObj.id] === true) {
                    selectedTags.push(tagObj.tag)
                }
            })
        }
        if (allTypes && formTypes) {
            allTypes.forEach(typeObj => {
                if (formTypes['id' + typeObj.id] === true) {
                    selectedTypes.push(typeObj.type)
                }
            })
        }
        let matchingShelters = []
        if (selectedTypes && selectedTags){
            this.props.reduxState.shelters.forEach(shelter => {
                if (this.doesShelterMatch(shelter, selectedTags) && this.doesShelterMatch(shelter, selectedTypes)) {
                    matchingShelters.push(shelter)
                };
            })
        } else if (selectedTypes ) {
            this.props.reduxState.shelters.forEach(shelter => {
                if (this.doesShelterMatch(shelter, selectedTypes)) {
                    matchingShelters.push(shelter)
                };
            })
        } else if ( selectedTags) {
            this.props.reduxState.shelters.forEach(shelter => {
                if (this.doesShelterMatch(shelter, selectedTags)) {
                    matchingShelters.push(shelter)
                };
            })
        }
        if (matchingShelters !== []){
            return matchingShelters;
        } else {
            return this.props.reduxState.shelters;
        }
    }

    doesShelterMatch = (shelter, selectedTags) => {
        let fullMatch = true;
        selectedTags.forEach(selectedTag => {
            let tagMatch = false;
            shelter.tags.forEach(shelterTag => {
                if (shelterTag === selectedTag) {
                    tagMatch = true;
                    return;
                }
            })
            if (tagMatch === false) {
                fullMatch = false
            }
        })
        return fullMatch
    }
    render() {
        return (
            <>
                <Search
                    filterSearchResults={this.filterSearchResults}
                />
                <ShelterList
                    shelters={this.props.reduxState.shelters}
                    goToDetailsPage={this.goToDetailsPage}
                />
            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterListing);
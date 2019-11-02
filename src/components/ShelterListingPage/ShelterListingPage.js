import React, { Component } from 'react';
import { connect } from "react-redux";
import ShelterList from './ShelterList/ShelterList'
import Search from '../ShelterListingPage/Search/Search'
import SelectedFilters from './SelectedFilters/SelectedFilters'
import Nav from '../Nav/Nav'

class ShelterListingPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_SHELTERS' });
        // all shelter data into global state
    }
    goToDetailsPage = (id) => {
        this.props.history.push(`/explore/${id}`)
    }

    filterSearchResults = (allTags, allTypes, formTags, formTypes) => {
        let selectedTags = [];
        let selectedTypes = [];
        // if tags were selected in the modal, it pushes them to the selectedTags array
        if (allTags && formTags) {
            allTags.forEach(tagObj => {
                if (formTags['id' + tagObj.id] === true) {
                    selectedTags.push(tagObj.tag)
                }
            })
        }
        // if types were selected in the modal, push them to the selectedtypes array
        if (allTypes && formTypes) {
            allTypes.forEach(typeObj => {
                if (formTypes['id' + typeObj.id] === true) {
                    selectedTypes.push(typeObj.type)
                }
            })
        }
        let matchingShelters = []
        // if types AND tags were selected, we need to check that they all match match at once
        if (selectedTypes.length > 0 && selectedTags.length > 0) {
            this.props.reduxState.shelters.forEach(shelter => {
                // functions doFiltersMatch return true or false
                if (this.doFiltersMatch(shelter.tags, selectedTags, 'tag') && this.doFiltersMatch(shelter.types, selectedTypes, 'type')) {
                    matchingShelters.push(shelter)
                }
            })
            // if only type filters were selected, then we only need to check that
        } else if (selectedTypes.length > 0) {
            this.props.reduxState.shelters.forEach(shelter => {
                if (this.doFiltersMatch(shelter.types, selectedTypes, 'type')) {
                    matchingShelters.push(shelter)
                }
            })
            // and same with tags
        } else if (selectedTags.length > 0) {
            this.props.reduxState.shelters.forEach(shelter => {
                console.log(this.doFiltersMatch(shelter.tags, selectedTags, 'tag'))
                if (this.doFiltersMatch(shelter.tags, selectedTags, 'tag')) {
                    matchingShelters.push(shelter)
                }
            })
        }
        return {
            shelters: matchingShelters,
            filters: [...selectedTags, ...selectedTypes]
        };
    }

    doFiltersMatch = (shelterItems, selectedItems, keyName) => {
        console.log(shelterItems, selectedItems, keyName)
        let fullMatch = true;
        selectedItems.forEach(selectedItem => {
            let itemMatch = false;
            shelterItems.forEach(shelterItem => {
                if (shelterItem[keyName] === selectedItem) {
                    itemMatch = true;
                    return;
                }
            })
            if (itemMatch === false) {
                fullMatch = false
            }
        })
        return fullMatch
    }

    reloadSheltersWithSearchResults = (searchResults) => {
        this.setState({
            ...this.state,
            shelters: searchResults.shelters,
            filters: searchResults.filters
        })
    }

    render() {
        return (
            <>
                <Nav />
                <Search
                    filterSearchResults={this.filterSearchResults}
                    reloadSheltersWithSearchResults={this.reloadSheltersWithSearchResults}
                />
                {this.state ? <SelectedFilters filters={this.state.filters} /> : ''}
                <ShelterList
                    shelters={this.state ? this.state.shelters : this.props.reduxState.shelters}
                    goToDetailsPage={this.goToDetailsPage}
                />
            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(ShelterListingPage);
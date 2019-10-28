import React, { Component } from 'react';
import { connect } from "react-redux";
import ShelterList from './ShelterList/ShelterList'
import Search from '../ShelterListingPage/Search/Search'
import SelectedFilters from './SelectedFilters/SelectedFilters'
import Nav from '../Nav/Nav'

class ShelterListingPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_SHELTERS' });
        // console.log(this.props.reduxState.shelters, Array.isArray(this.props.reduxState.shelters))
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
                if (this.doShelterTagsMatch(shelter.tags, selectedTags) && this.doShelterTypesMatch(shelter.types, selectedTypes)) {
                    matchingShelters.push(shelter)
                };
            })
        } else if (selectedTypes ) {
            this.props.reduxState.shelters.forEach(shelter => {
                if (this.doShelterTypesMatch(shelter.types.type, selectedTypes)) {
                    matchingShelters.push(shelter)
                };
            })
        } else if ( selectedTags) {
            this.props.reduxState.shelters.forEach(shelter => {
                if (this.doShelterTagsMatch(shelter.tags, selectedTags)) {
                    matchingShelters.push(shelter)
                };
            })
        }
        if (matchingShelters !== []){
            return {
                shelters: matchingShelters, 
                filters: [...selectedTags, ...selectedTypes]
            };
        } else {
            return {
                shelters: this.props.reduxState.shelters, 
                filters: [...selectedTags, ...selectedTypes]
        };;
        }
    }
    doShelterTagsMatch = (shelterItems, selectedItems) => {
        let fullMatch = true;
        selectedItems.forEach(selectedItem => {
            let itemMatch = false;
            shelterItems.forEach(shelterItem => {
                if (shelterItem === selectedItem) {
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
    doShelterTypesMatch = (shelterItems, selectedItems) => {
        let fullMatch = true;
        selectedItems.forEach(selectedItem => {
            let itemMatch = false;
            shelterItems.forEach(shelterItem => {
                if (shelterItem.type === selectedItem) {
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
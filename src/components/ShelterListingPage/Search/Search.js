import React, { Component } from 'react';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    FormGroup,
    Checkbox,
    FormHelperText
} from '@material-ui/core';
import { Modal, Header, Icon, Button } from 'semantic-ui-react'
import axios from 'axios';
import SearchModal from './SearchModal/SearchModal'


//--------------COMPONENT------------------//

class Search extends Component {
    state = {
        form: {},
        results: []
    }
    componentDidMount() {
        this.getTags();
        this.getTypes();
    }
    getTags = () => {
        axios.get('/api/shelter/tags').then(response => {
            this.setState({
                ...this.state,
                tags: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }
    getTypes = () => {
        axios.get('/api/shelter/types').then(response => {
            this.setState({
                ...this.state,
                types: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }
    handleChange = (event, tagId, tagsOrTypes) => {
        //grabs the tag ID from the dom and generates a keyname for it
        //to store the checked/unchecked status in this.state.form
        let keyName = 'id' + tagId
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [tagsOrTypes]: {
                    ...this.state.form[tagsOrTypes],
                    [keyName]: event.target.checked
                }
            }
        });
    };
    handleSubmit = () => {
        console.log(this.state)
        //closes modal
        this.handleClose();
        const searchResults = this.props.filterSearchResults(this.state.tags, this.state.types, this.state.form.tags, this.state.form.types)
        this.props.reloadSheltersWithSearchResults(searchResults);
        console.log(searchResults)
    } // end handle submit

    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })
    render() {
        return (
            <div className="searchModalButton">
                <Modal
                    trigger={<Button onClick={this.handleOpen}>Filter by Tags and Guest Type</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}

                    size='small'
                >
                    <Header icon='browser' content='Filter by Tags and Guest Type' />
                    <Modal.Content>
                        <SearchModal
                            tags={this.state.tags}
                            types={this.state.types}
                            handleChange={this.handleChange}
                            form={this.state.form}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green'
                            type='submit'
                            onClick={this.handleSubmit}
                            inverted
                        >
                            <Icon name='search' /> Search
                        </Button>
                    </Modal.Actions>
                </Modal>
                {this.state.form.tags || this.state.form.types ?
                    <ul>
                        {/* {this.state.form.tags.map(tag => {
                            return <li>{tag}</li>
                        })}
                        {this.state.form.types.map(type => {
                            return <li>{type.type}</li>
                        })} */}
                        {/* these are freaking objects not arrays!!!! */}
                    </ul>
                    : ''}

            </div>
        )
    }
}

export default Search;
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Grid, Dropdown } from 'semantic-ui-react'
import Header from '../Header/Header'
import swal from 'sweetalert'

class UserPortalSignUp2 extends Component {
    state = {
        selectedTags: this.props.reduxState.signUpForm.tags || [],
    }
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TAGS' });
    }
    mapTagsToDropdown() {
        let dropdownValues = []
        this.props.reduxState.tags.forEach(obj => {
            dropdownValues.push({
                id: obj.id,
                text: obj.tag,
                key: obj.tag,
                value: obj.tag,
            })
        })
        return dropdownValues
    }
    handleDispatch = (direction) => {
        this.props.dispatch({ type: 'TAGS_FORM', payload: this.state.selectedTags })
        if (direction === 'NEXT'){
            this.props.handleNext()
        } else {
            this.props.handleBack()
        }
    }
    // handleBack = () => {
    //     this.props.dispatch({ type: 'TAGS_FORM', payload: this.state.selectedTags })
    //     this.props.history.push('/sign-up-3')
    // }
    handleTagChange = (event, { value }) => {
        let currentTag = value;
        let redundant = false;
        this.state.selectedTags.forEach(selectedTag => {
            if (selectedTag.tag === currentTag) {
                console.log(selectedTag.tag, currentTag)
                redundant = true;
                alert('already selected')
            }
        })
        if (!redundant) {
            this.props.reduxState.tags.forEach(tag => {
                if (tag.tag === currentTag) {
                    this.setState({
                        ...this.state,
                        selectedTags: [...this.state.selectedTags, { tag: currentTag, tag_id: tag.id }]
                    })
                }
            })
        }
    }
    deleteFromState = (event) => {
        let deleteTag = event.target.value;
        let tagsArray = [...this.state.selectedTags]
        tagsArray.forEach(tag => {
            if (tag === deleteTag) {
                tagsArray.splice(tagsArray.indexOf(tag), 1);
            }
        })
        this.setState({
            ...this.state,
            selectedTags: [...tagsArray]
        })
    }
    render() {
        return (
            <>
                {/* <Header
                    icon1={'checkmark'}
                    icon2={'checkmark'}
                    icon3={'checkmark'}
                    value4={4}
                    value5={'Review'}
                    color4={'grey'}
                /> */}
                <div className='signUpContainer'>
                    <div>
                        <Grid celled >
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <span className='tableLabel'>Tags</span>
                                </Grid.Column>
                            </Grid.Row>
                            {this.state.selectedTags.map(selectedTag => (
                                <Grid.Row>
                                    <Grid.Column width={14}>
                                        {selectedTag.tag}
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Button value={selectedTag.tag} onClick={this.deleteFromState}>X</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            ))}
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <Dropdown
                                        selection
                                        placeholder='Select a tag'
                                        options={this.mapTagsToDropdown()}
                                        onChange={this.handleTagChange}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    <Button onClick={() => this.handleDispatch('BACK')}>Back</Button>
                    <Button primary onClick={() => this.handleDispatch('NEXT')}>Next</Button>

                </div>
            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(UserPortalSignUp2);
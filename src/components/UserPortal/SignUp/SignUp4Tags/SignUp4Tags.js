import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Grid } from 'semantic-ui-react'
import Header from '../Header/Header'

class UserPortalSignUp2 extends Component {
    state = {
        selectedTags: this.props.reduxState.signUpForm.tags || [],
    }
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TAGS' });
    }
    handleSubmit = () => {
        console.log(this.state.selectedTags)
        this.props.dispatch({ type: 'TAGS_FORM', payload: this.state.selectedTags })
        this.props.history.push('/sign-up-submit')
    }
    handleBack = () => {
        this.props.dispatch({ type: 'TAGS_FORM', payload: this.state.selectedTags })
        this.props.history.push('/sign-up-3')
    }
    handleTagChange = (event) => {
        let currentTag = event.target.value;
        let redundant = false;
        this.state.selectedTags.forEach(selectedTag => {
            if (selectedTag.tag === currentTag) {
                console.log(selectedTag.tag, currentTag)
                redundant = true;
                alert('already selected')
            }
        })
        if (!redundant) {
            this.setState({
                ...this.state,
                selectedTags: [...this.state.selectedTags, { tag: currentTag }]
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
                <div>
                    <Header
                        icon1={'checkmark'}
                        icon2={'checkmark'}
                        icon3={'checkmark'}
                        value4={4}
                        value5={'Review'}
                        color4={'grey'}
                    />
                    <div>
                        <Grid celled >
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    Tags
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
                                    <select className="dropdown" onChange={this.handleTagChange}>
                                        {this.props.reduxState.tags.map(tag => (
                                            <option key={tag.id}>{tag.tag}</option>
                                        ))}
                                    </select>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    <Button onClick={this.handleBack}>Back</Button>
                    <Button primary onClick={this.handleSubmit}>Next</Button>

                </div>
            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(UserPortalSignUp2);
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Grid } from 'semantic-ui-react'

class UserPortalSignUp2 extends Component {
    state = {
        selectedTags: [{ id: 1, tag: 'shower' }],
    }
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TAGS' });
    }
    handleSubmit = () => {
        console.log(this.state.selectedTags)
        this.props.dispatch({ type: 'TAGS_FORM', payload: this.state.selectedTags })
        this.props.history.push('/sign-up-submit')
    }
    handleTagChange = (event) => {
        let currentTag = event.target.value;
        let redundant = false;
        this.state.selectedTags.forEach(selectedTag => {
            if (selectedTag.tag === currentTag){
                console.log(selectedTag.tag, currentTag)
                redundant = true;
                alert('already selected')
            }  
        })
        if (!redundant){
            this.setState({
                ...this.state,
                selectedTags: [...this.state.selectedTags, { tag: currentTag }]
            })
        }
    }
    render() {
        return (
            <>
                <div>
                    <div>
                        <Grid celled >
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    Tags
                                </Grid.Column>
                            </Grid.Row>
                            {this.state.selectedTags.map(selectedTag => (
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        {selectedTag.tag}
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
                    <Button onClick={this.handleSubmit}>Next</Button>

                </div>
            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(UserPortalSignUp2);
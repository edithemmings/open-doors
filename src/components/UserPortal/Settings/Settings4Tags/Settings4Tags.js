import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Grid } from 'semantic-ui-react'

class Settings4Tags extends Component {
    componentDidMount() {
        // console.log(this.props.shelter.tags)
    }
    handleTagChange = (event) => {
        let currentTag = event.target.value;
        let redundant = false;
        if (this.props.shelter.tags){
            this.props.shelter.tags.forEach(tag => {
                if (tag === currentTag) {
                    // console.log(tag, currentTag)
                    redundant = true;
                    alert('already selected')
                }
            })
        }
        if (!redundant) {
            let totalTags = [...this.props.shelter.tags, event.target.value]
            this.props.handleEdit('tags', totalTags)
        }
    }
    deleteTag = (event) => {
        let remainingTags = []
        this.props.shelter.tags.forEach(tag => {
            if (tag != event.target.value) {
                remainingTags.push(tag)
            }
        })
        this.props.handleEdit('tags', remainingTags)
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
                            {this.props.shelter.tags ? this.props.shelter.tags.map(tag => (
                                <Grid.Row>
                                    <Grid.Column width={14}>
                                        {tag}
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Button
                                            size='mini'
                                            value={tag}
                                            onClick={this.deleteTag}
                                        >X</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            )): ''}
                            <Grid.Row>
                                <Grid.Column width={14}>
                                    <select className="dropdown" onChange={this.handleTagChange}>
                                        {this.props.reduxState.tags.map(tag => (
                                            <option key={tag.id}>{tag.tag}</option>
                                        ))}
                                    </select>
                                </Grid.Column>
                                <Grid.Column width={2}>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>

                </div>
            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(Settings4Tags);
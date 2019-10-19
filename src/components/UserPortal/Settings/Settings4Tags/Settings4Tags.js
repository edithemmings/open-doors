import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Grid } from 'semantic-ui-react'

class Settings4Tags extends Component {
    // state = {
    //     selectedTags: [{ id: 1, tag: 'shower' }],
    // }
    componentDidMount() {
        console.log(this.props.shelter.tags)
    }
    handleTagChange = (event) => {
        let currentTag = event.target.value;
        let redundant = false;
        if (this.props.shelter.tags){
            this.props.shelter.tags.forEach(tag => {
                if (tag.tag === currentTag) {
                    console.log(tag.tag, currentTag)
                    redundant = true;
                    alert('already selected')
                }
            })
        }////THIS ISN'T WORKING
        if (!redundant) {
            let totalTags = [...this.props.shelter.tags, event.target.value]
            this.props.handleEdit('tags', totalTags)
        }
    }

    //NEED DELETE FUNCTIONALITY
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
                            {this.props.shelter.tags.map(tag => (
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        {tag}
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

export default connect(putStateOnProps)(Settings4Tags);
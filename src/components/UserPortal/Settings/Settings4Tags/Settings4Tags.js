import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Grid, Dropdown } from 'semantic-ui-react'

class Settings4Tags extends Component {
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
    handleTagChange = (event, {value}) => {
        let currentTag = value;
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
            let totalTags = [...this.props.shelter.tags, {id: value, tag: value}]
            this.props.handleEdit('tags', totalTags)
            this.props.update('tags', {tag: value}, 'post')
        }
    }
    deleteTag = (event, {value}) => {
        let remainingTags = []
        this.props.shelter.tags.forEach(tag => {
            if (tag.tag != value) {
                remainingTags.push(tag)
            }
        })
        this.props.handleEdit('tags', remainingTags)
        this.props.update('tags', {tag: value}, 'delete')
    }
    
    render() {
        return (
            <>
                <div>
                    <div>
                        <Grid celled >
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <span className='tableLabel'>Tags</span>
                                </Grid.Column>
                            </Grid.Row>
                            {this.props.shelter.tags ? this.props.shelter.tags.map(tag => (
                                <Grid.Row key={tag.id}>
                                    <Grid.Column width={14}>
                                        {tag.tag}
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Button
                                            size='mini'
                                            value={tag.tag}
                                            onClick={this.deleteTag}
                                        >X</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            )): ''}
                            <Grid.Row>
                                <Grid.Column width={14}> 
                                    <Dropdown
                                        selection
                                        placeholder='Select a tag'
                                        options={this.mapTagsToDropdown()}
                                        onChange={this.handleTagChange}
                                    />
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
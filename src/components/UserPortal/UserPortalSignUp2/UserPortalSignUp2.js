import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Input, Grid, Dropdown } from 'semantic-ui-react'

class ShelterPortalHome extends Component {
    state = {
        allTags: [
            { id: 1, tag: 'shower' },
            { id: 2, tag: 'laundry' },
            { id: 3, tag: 'no sobriety requirement' }
        ],
        allTypes: [
            { id: 1, type: 'adult/male identified' },
            { id: 2, type: 'adult/female identified' },
            { id: 3, type: 'veteran' },
            { id: 4, type: 'family' }
        ],
        selectedTags: [{ id: 1, tag: 'shower' }],
        selectedTypes: [{ id: 1, type: 'family', capacity: 45 }]
    }

    handleTypeAdd = () => {
        console.log(this.state.inputType)
        if (this.state.inputType) {
            this.setState({
                ...this.state,
                selectedTypes: [...this.state.selectedTypes, this.state.inputType]
            })
        }}
        handleTypeNameChange = (event) => {
            this.setState({
                ...this.state,
                inputType: {
                    ...this.state.inputType,
                    type: event.target.value
                }
            })
        }
        handleTypeCapacityChange = (event) => {
            this.setState({
                ...this.state,
                inputType: {
                    ...this.state.inputType,
                    capacity: event.target.value
                }
            })
        }

        render() {
            return (
                <>
                    <div>
                        <div>
                            <Grid celled >
                                <Grid.Row>
                                    <Grid.Column width={10}>
                                        Guest Types
                            </Grid.Column>
                                    <Grid.Column width={6}>
                                        Capacity
                            </Grid.Column>
                                </Grid.Row>
                                {this.state.selectedTypes.map(selectedTypes => (
                                    <Grid.Row>
                                        <Grid.Column width={10}>
                                            {selectedTypes.type}
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                            {selectedTypes.capacity}
                                        </Grid.Column>
                                    </Grid.Row>
                                ))}
                                <Grid.Row>
                                    <Grid.Column width={10}>
                                        <select className="dropdown"
                                            onChange={this.handleTypeNameChange}>
                                            {this.state.allTypes.map(type => (
                                                <option key={type.id}>{type.type}</option>
                                            ))}
                                        </select>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <Input fluid placeholder={'Capacity'} onChange={this.handleTypeCapacityChange} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Button onClick={this.handleTypeAdd}>Add</Button>
                        </div>

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
                                        <select className="dropdown">
                                            {this.state.allTags.map(tag => (
                                                <option key={tag.id}>{tag.tag}</option>
                                            ))}
                                        </select>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Button>Add</Button>
                        </div>
                        <Button>Next</Button>

                    </div>
                </>
            )
        }
    }


    const putStateOnProps = (reduxState) => ({
        reduxState
    })

    export default connect(putStateOnProps)(ShelterPortalHome);
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Input, Grid } from 'semantic-ui-react'

class UserPortalSignUp2 extends Component {
    state = {
        selectedTypes: [{ id: 1, type: 'family', capacity: 45 }]
    }
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TYPES' });
    }

    handleSubmit = () => {
        console.log(this.state.selectedTypes)
        this.props.dispatch({ type: 'TYPES_FORM', payload: this.state.selectedTypes })
        this.props.dispatch({ type: 'ID_FOR_FORM', payload: this.props.reduxState.userShelter.id })
        this.props.history.push('/sign-up-3')
    }

    handleTypeAdd = () => {
        console.log(this.state.inputType)
        if (this.state.inputType) {
            this.setState({
                ...this.state,
                selectedTypes: [...this.state.selectedTypes, this.state.inputType]
            })
        }
    }
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
                                        {this.props.reduxState.types.map(type => (
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
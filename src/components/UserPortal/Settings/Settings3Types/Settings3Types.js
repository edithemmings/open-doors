import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Input, Grid } from 'semantic-ui-react'

class Settings3Types extends Component {
    state = { inputType: { capacity: '' } }
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TYPES' });
    }
    handleTypeChange = (event, keyName) => {
        this.setState({
            ...this.state,
            inputType: {
                ...this.state.inputType,
                [keyName]: event.target.value
            }
        })
        console.log(this.state.inputType)
    }
    handleTypeAdd = () => {
        // console.log(this.state.inputType)
        let totalTypes = this.props.shelter.types
        if (this.state.inputType) {
            totalTypes.push(this.state.inputType)
        }
        this.props.handleEdit('types', totalTypes)
        this.props.update('types', this.state.inputType, 'post')
        this.setState({
            ...this.state,
            inputType: {
                ...this.state.inputType,
                capacity: ''
            }
        })
    }
    deleteType = (event) => {
        let remainingTypes = []
        this.props.shelter.types.forEach(type => {
            if (type.type != event.target.value) {
                remainingTypes.push(type)
            }
        })
        this.props.handleEdit('types', remainingTypes)
        this.props.update('types', {type: event.target.value}, 'delete')
    }

    render() {
        return (
            <>
                <div>
                    <div>
                        <Grid celled >
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <span className='tableLabel'>Guest Types</span>
                            </Grid.Column>
                                <Grid.Column width={8}>
                                    <span className='tableLabel'>Capacity</span>
                            </Grid.Column>
                            </Grid.Row>
                            {this.props.shelter.types ? this.props.shelter.types.map(selectedTypes => (
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        {selectedTypes.type}
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        {selectedTypes.capacity}
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Button
                                            size='mini'
                                            value={selectedTypes.type}
                                            onClick={this.deleteType}
                                        >X</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            )) : ''}
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <select className="dropdown"
                                        onChange={(e) => this.handleTypeChange(e, 'type')}>
                                        {this.props.reduxState.types.map(type => (
                                            <option key={type.id}>{type.type}</option>
                                        ))}
                                    </select>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Input
                                        fluid
                                        placeholder={'Capacity'}
                                        value={this.state.inputType.capacity}
                                        onChange={(e) => this.handleTypeChange(e, 'capacity')} />
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <Button onClick={this.handleTypeAdd}>Add</Button>
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

export default connect(putStateOnProps)(Settings3Types);
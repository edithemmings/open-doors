import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Input, Grid } from 'semantic-ui-react'
import Header from '../Header/Header'
import swal from 'sweetalert'

class UserPortalSignUp2 extends Component {
    state = {
        selectedTypes: this.props.reduxState.signUpForm.types || [],
        inputType: { capacity: '' }
    }
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TYPES' });
    }

    handleSubmit = () => {
            // console.log(this.state.selectedTypes)
            this.props.dispatch({ type: 'TYPES_FORM', payload: this.state.selectedTypes })
            this.props.dispatch({ type: 'ID_FOR_FORM', payload: this.props.reduxState.userShelter.id })
            this.props.history.push('/sign-up-4')
    
    }
    handleBack = () => {
        this.props.dispatch({ type: 'TYPES_FORM', payload: this.state.selectedTypes })
        this.props.history.push('/sign-up-2')
    }

    handleTypeAdd = () => {
        if (!this.state.inputType.type) {
            return;
        }
        this.setState({
            ...this.state,
            selectedTypes: [...this.state.selectedTypes, this.state.inputType],
            inputType: {
                ...this.state.inputType,
                capacity: ''
            }
        })
    }
    handleTypeNameChange = (event) => {
        this.props.reduxState.types.forEach(type => {
            if (type.type === event.target.value){
                this.setState({
                    ...this.state,
                    inputType: {
                        ...this.state.inputType,
                        type: event.target.value,
                        type_id: type.id
                    }
                })
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
    deleteFromState = (event) => {
        let deleteType = event.target.value;
        let typesArray = [...this.state.selectedTypes]
        typesArray.forEach(type => {
            if (type.type === deleteType) {
                console.log('MAAAATCH')
                typesArray.splice(typesArray.indexOf(type), 1);
            }
        })
        this.setState({
            ...this.state,
            selectedTypes: [...typesArray]
        })
    }
    render() {
        return (
            <>
                <div>
                    <Header
                        icon1={'checkmark'}
                        icon2={'checkmark'}
                        value3={3}
                        value4={4}
                        value5={'Review'}
                        color3={'grey'}
                    />
                    <div className='signUpContainer'>
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
                                {this.state.selectedTypes.map(selectedTypes => (
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            {selectedTypes.type}
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                            {selectedTypes.capacity}
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Button value={selectedTypes.type} onClick={this.deleteFromState}>X</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                ))}
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <select className="dropdown"
                                            onChange={this.handleTypeNameChange}>
                                            <option key='default'> </option>
                                            {this.props.reduxState.types.map(type => (
                                                <option key={type.id}>{type.type}</option>
                                            ))}
                                        </select>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <Input fluid
                                            placeholder={'Capacity'}
                                            onChange={this.handleTypeCapacityChange}
                                            value={this.state.inputType.capacity} />
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Button onClick={this.handleTypeAdd}>Add</Button>                                </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                        <Button onClick={this.handleBack}>Back</Button>
                        <Button primary onClick={this.handleSubmit}>Next</Button>

                    </div>
                </div>
            </>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(UserPortalSignUp2);
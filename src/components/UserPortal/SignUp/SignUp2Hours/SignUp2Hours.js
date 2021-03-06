import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Input, Grid } from 'semantic-ui-react'
import Header from '../Header/Header'
import swal from "sweetalert";
class UserPortalSignUp1 extends Component {
    state = {
        allDays: [
            { id: 1, day: 'Monday' },
            { id: 2, day: 'Tuesday' },
            { id: 3, day: 'Wednesday' },
            { id: 4, day: 'Friday' },
            { id: 5, day: 'Saturday' },
            { id: 6, day: 'Sunday' },
            { id: 7, day: 'Every day' },
            { id: 8, day: 'Monday-Friday' },
            { id: 9, day: 'Saturday-Sunday' }
        ],
        selectedDays: this.props.reduxState.signUpForm.hours || [],
        inputHour: {
            open: '',
            close: ''
        }
    }
    handleSubmit = () => {
            this.props.dispatch({ type: 'HOURS_FORM', payload: this.state.selectedDays })
            this.props.history.push('/sign-up-3')
        
    }
    handleBack = () => {
        swal("Blocked", "Your shelter was already submitted. Please continue filling out the additional details. If you would like to make changes to your contact info, you may do it later in settings.", "error")
    }
    handleHourChange = (event, keyName) => {
        this.setState({
            ...this.state,
            inputHour: {
                ...this.state.inputHour,
                [keyName]: event.target.value
            }
        })
    }
    handleHourAdd = () => {
        if (!this.state.inputHour.day) {
            return;
        }
        if (this.state.inputHour) {
            this.setState({
                ...this.state,
                selectedDays: [...this.state.selectedDays, this.state.inputHour],
                inputHour: {
                    ...this.state.inputHour,
                    open: '',
                    close: ''
                }
            })
        }

    }
    deleteFromState = (event) => {
        let deletedDay = event.target.value;
        let hourArray = [...this.state.selectedDays]
        hourArray.forEach(hour => {
            if (hour.day === deletedDay) {
                hourArray.splice(hourArray.indexOf(hour), 1);
            }
        })
        this.setState({
            ...this.state,
            selectedDays: [...hourArray]
        })
    }
    presentationInfo1 = () => {
        this.setState({
            ...this.state,
            inputHour: {
                ...this.state.inputHour,
                open: '7:00 PM',
                close: '10:00 AM'
            }
        })
    }
    presentationInfo2 = () => {
        this.setState({
            ...this.state,
            inputHour: {
                ...this.state.inputHour,
                open: '5:00 PM',
                close: '9:00 AM'
            }
        })
    }
    render() {
        return (
            <div>
                <Header
                    icon1={'checkmark'}
                    value2={2}
                    value3={3}
                    value4={4}
                    value5={'Review'}
                    color2={'grey'}
                />
                <div className='signUpContainer'>
                    <div>
                        <label>Hours</label>
                        <Grid celled >
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <span className='tableLabel' onClick={this.presentationInfo1}>Day of the Week</span>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <span className='tableLabel' onClick={this.presentationInfo2}>Opens</span>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <span className='tableLabel'>Closes</span>
                                </Grid.Column>
                            </Grid.Row>
                            {this.state.selectedDays.map(selectedDay => (
                                <Grid.Row>
                                    <Grid.Column width={6}>
                                        {selectedDay.day}
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        {selectedDay.open}
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        {selectedDay.close}
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Button size='mini' value={selectedDay.day} onClick={this.deleteFromState}>X</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            ))}
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <select className="dropdown"
                                        onChange={(e) => this.handleHourChange(e, 'day')}
                                    >
                                        <option key='default'> </option>
                                        {this.state.allDays.map(day => (
                                            <option key={day.id}>{day.day}</option>
                                        ))}
                                    </select>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Input
                                        fluid
                                        placeholder={'Opens'}
                                        onChange={(e) => this.handleHourChange(e, 'open')}
                                        value={this.state.inputHour.open}
                                    />
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Input
                                        fluid
                                        placeholder={'Closes'}
                                        onChange={(e) => this.handleHourChange(e, 'close')}
                                        value={this.state.inputHour.close}
                                    />
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <Button onClick={this.handleHourAdd}>Add</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    <Button onClick={this.handleBack}>Back</Button>
                    <Button primary onClick={this.handleSubmit}>Next</Button>

                </div>
            </div>
        )
    }
}


const putStateOnProps = (reduxState) => ({
    reduxState
})

export default connect(putStateOnProps)(UserPortalSignUp1);